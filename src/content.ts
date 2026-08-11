import { getEmDashCollection, getEmDashEntry } from "emdash";

import copyEn from "./data/copy/en.json";
import projectsEn from "./data/copy/projects.en.json";
import projectsPt from "./data/copy/projects.pt.json";
import copyPt from "./data/copy/pt.json";
import projectsData from "./data/projects.json";
import type { Locale } from "./i18n/ui";

export interface ProjectImage {
  filename: string;
  alt: string;
}

export interface Project {
  title: string;
  location: string;
  status: "ongoing" | "sold" | "on_sale";
  date: string;
  endDate: string;
  slug: string;
  images: ProjectImage[];
}

export interface SiteCopy {
  site_name: string;
  site_slogan: string;
  description: string;
  about_description: string[];
  about_title: string;
  about_images: ProjectImage[];
  projects_title: string;
  projects_description: string[];
}

/**
 * A project as EmDash stores it. Field slugs have to be snake_case, and `slug`
 * and `status` are reserved for the entry itself, so the sale state is held in
 * `sale_status`; `data.slug` is the entry's own slug. Both are renamed back
 * when read.
 */
interface ProjectRow extends Omit<Project, "endDate" | "status"> {
  end_date: string;
  sale_status: string;
  description: string;
}

/** A project plus its localised text, in the shape the pages expect. */
interface ProjectEntry extends Project {
  description: string;
}

/** EmDash stores the paragraph lists as repeater rows. */
interface Paragraph {
  text: string;
}

interface SiteCopyEntry extends Omit<SiteCopy, "about_description" | "projects_description"> {
  about_description: Paragraph[];
  projects_description: Paragraph[];
}

const bundledCopy: Record<Locale, SiteCopy> = {
  en: copyEn,
  pt: copyPt,
};

const bundledDescriptions: Record<Locale, Record<string, { description: string }>> = {
  en: projectsEn,
  pt: projectsPt,
};

const STATUSES = new Set(["ongoing", "sold", "on_sale"]);

function isProjectStatus(value: string): value is Project["status"] {
  return STATUSES.has(value);
}

/** Narrows a stored row so its sale state can be used as the project status. */
function hasKnownStatus(row: ProjectRow): row is ProjectRow & { sale_status: Project["status"] } {
  return isProjectStatus(row.sale_status);
}

function bundledProjects(): Project[] {
  return projectsData.map((entry) => {
    if (!isProjectStatus(entry.status)) {
      throw new Error(`Unknown project status "${entry.status}" for ${entry.slug}`);
    }
    return { ...entry, status: entry.status };
  });
}

/**
 * Cache each query on `locals` so a layout and the page it renders share one
 * database read. Module scope is reused across requests in a Worker, so the
 * cache has to be request-scoped rather than global.
 */
type Cache = App.Locals & {
  copy?: Map<Locale, Promise<SiteCopy>>;
  projects?: Map<Locale, Promise<ProjectEntry[]>>;
};

function cached<T>(store: Map<Locale, Promise<T>>, locale: Locale, load: () => Promise<T>) {
  const hit = store.get(locale);
  if (hit) return hit;
  const pending = load();
  store.set(locale, pending);
  return pending;
}

export function getCopy(locals: App.Locals, locale: Locale): Promise<SiteCopy> {
  const cache = locals as Cache;
  cache.copy ??= new Map();
  return cached(cache.copy, locale, () => loadCopy(locale));
}

async function loadCopy(locale: Locale): Promise<SiteCopy> {
  try {
    const { entry } = await getEmDashEntry<"site_copy", SiteCopyEntry>("site_copy", "site-copy", {
      locale,
    });
    if (!entry) return bundledCopy[locale];
    return {
      ...entry.data,
      about_description: entry.data.about_description.map((row) => row.text),
      projects_description: entry.data.projects_description.map((row) => row.text),
    };
  } catch {
    return bundledCopy[locale];
  }
}

function getProjectEntries(locals: App.Locals, locale: Locale): Promise<ProjectEntry[]> {
  const cache = locals as Cache;
  cache.projects ??= new Map();
  return cached(cache.projects, locale, () => loadProjects(locale));
}

async function loadProjects(locale: Locale): Promise<ProjectEntry[]> {
  try {
    const { entries } = await getEmDashCollection<"projects", ProjectRow>("projects", {
      locale,
      status: "published",
    });
    const projects = entries
      .map(({ data }) => data)
      .filter(hasKnownStatus)
      .map(({ end_date, sale_status, ...data }) => ({
        ...data,
        endDate: end_date,
        status: sale_status,
      }));
    if (projects.length > 0) return projects;
  } catch {
    // Fall through to the copy that shipped with the build.
  }
  return bundledProjects().map((project) => ({
    ...project,
    description: bundledDescriptions[locale][project.slug]?.description ?? "",
  }));
}

export async function getProjects(locals: App.Locals, locale: Locale): Promise<Project[]> {
  return getProjectEntries(locals, locale);
}

export async function getProjectDescription(
  locals: App.Locals,
  locale: Locale,
  slug: string,
): Promise<string> {
  const entries = await getProjectEntries(locals, locale);
  return entries.find((entry) => entry.slug === slug)?.description ?? "";
}
