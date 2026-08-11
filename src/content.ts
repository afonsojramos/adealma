import copyEn from "./data/copy/en.json";
import projectsEn from "./data/copy/projects.en.json";
import projectsPt from "./data/copy/projects.pt.json";
import copyPt from "./data/copy/pt.json";
// Content access for the site.
//
// EmDash is wired up in astro.config.mjs and is where this content is heading:
// projects become a localised collection, page copy becomes localised content.
// Until the D1 database exists (blocked on Cloudflare API token permissions),
// the JSON that shipped with the Next.js site is the source, so the site is
// deployable today and the CMS cutover is a content migration rather than
// another code change.
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
  about_title: string;
  about_description: string[];
  about_images: ProjectImage[];
  projects_title: string;
  projects_description: string[];
}

const copy: Record<Locale, SiteCopy> = {
  en: copyEn,
  pt: copyPt,
};

const descriptions: Record<Locale, Record<string, { description: string }>> = {
  en: projectsEn,
  pt: projectsPt,
};

export function getCopy(locale: Locale): SiteCopy {
  return copy[locale];
}

const STATUSES = new Set(["ongoing", "sold", "on_sale"]);

function isProjectStatus(value: string): value is Project["status"] {
  return STATUSES.has(value);
}

export function getProjects(): Project[] {
  // TypeScript types an imported JSON `status` as `string`, so asserting it to
  // the union would let a bad value through silently. Validated instead, which
  // also catches a typo in the data rather than rendering it.
  return projectsData.map((entry) => {
    if (!isProjectStatus(entry.status)) {
      throw new Error(`Unknown project status "${entry.status}" for ${entry.slug}`);
    }
    return { ...entry, status: entry.status };
  });
}

export function getProjectDescription(locale: Locale, slug: string): string {
  return descriptions[locale][slug]?.description ?? "";
}
