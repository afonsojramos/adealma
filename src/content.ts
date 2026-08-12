import { getEmDashCollection, getEmDashEntry } from "emdash";

import copyEn from "./data/copy/en.json";
import projectsEn from "./data/copy/projects.en.json";
import projectsPt from "./data/copy/projects.pt.json";
import copyPt from "./data/copy/pt.json";
import projectsData from "./data/projects.json";
import type { Locale } from "./i18n/ui";

/**
 * An image stored in EmDash. `src` points at the media route, which streams
 * the file from R2 with a one-year immutable cache header.
 */
export interface Media {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ProjectImage {
  image: Media;
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
  banner: Media;
  preview: Media;
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
 *
 * A project is one entry rather than one per locale: only the description
 * differs between languages, so both descriptions live on the same entry and
 * the rest is edited once.
 */
interface ProjectRow extends Omit<Project, "endDate" | "status"> {
  end_date: string;
  sale_status: string;
  description_en: string;
  description_pt: string;
}

/** The locale every project entry is stored under. */
const PROJECT_LOCALE = "en";

/** A project plus its localised text, in the shape the pages expect. */
interface ProjectEntry extends Project {
  description: string;
}

/** EmDash stores the paragraph lists as repeater rows. */
interface Paragraph {
  text: string;
}

/** The site-wide settings entry. */
type SiteRow = Pick<SiteCopy, "site_name" | "site_slogan" | "description">;

/** A page entry: every page is stored with the same three fields. */
interface PageRow {
  slug: string;
  title: string;
  paragraphs: Paragraph[];
  images?: ProjectImage[];
}

/**
 * The images that shipped in `public/images` back the CMS: the bundled copy is
 * still described by filename, so it is turned into the same media shape the
 * CMS returns, pointing at the static file instead of the media route.
 */
function bundledMedia(filename: string, alt: string): Media {
  return { src: `/images/${filename}.webp`, alt };
}

function bundledGallery(items: { filename: string; alt: string }[]): ProjectImage[] {
  return items.map((item) => ({ image: bundledMedia(item.filename, item.alt), alt: item.alt }));
}

const bundledCopy: Record<Locale, SiteCopy> = {
  en: { ...copyEn, about_images: bundledGallery(copyEn.about_images) },
  pt: { ...copyPt, about_images: bundledGallery(copyPt.about_images) },
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
    return {
      ...entry,
      status: entry.status,
      images: bundledGallery(entry.images),
      banner: bundledMedia(`${entry.slug}/banner`, entry.title),
      preview: bundledMedia(entry.slug, entry.title),
    };
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

/**
 * The copy is split across two collections so each page can be edited on its
 * own: `site_copy` holds what the whole site shares, `pages` holds one entry
 * per page. They are recombined here so the components keep one flat object.
 */
async function loadCopy(locale: Locale): Promise<SiteCopy> {
  try {
    const [site, pages] = await Promise.all([
      getEmDashEntry<"site_copy", SiteRow>("site_copy", "site-copy", { locale }),
      getEmDashCollection<"pages", PageRow>("pages", { locale, status: "published" }),
    ]);
    const about = pages.entries.find(({ data }) => data.slug === "about")?.data;
    const projectsPage = pages.entries.find(({ data }) => data.slug === "projects")?.data;
    if (!site.entry || !about || !projectsPage) return bundledCopy[locale];
    return {
      ...site.entry.data,
      about_title: about.title,
      about_description: about.paragraphs.map((row) => row.text),
      about_images: about.images ?? [],
      projects_title: projectsPage.title,
      projects_description: projectsPage.paragraphs.map((row) => row.text),
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
      locale: PROJECT_LOCALE,
      status: "published",
    });
    const projects = entries
      .map(({ data }) => data)
      .filter(hasKnownStatus)
      .map(({ end_date, sale_status, description_en, description_pt, ...data }) => ({
        ...data,
        endDate: end_date,
        status: sale_status,
        description: locale === "pt" ? description_pt : description_en,
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
