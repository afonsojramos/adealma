import { defaultLocale, type Locale } from "./ui";

/** Build a path for a locale: the default locale is unprefixed, others are prefixed. */
export function localePath(locale: Locale, path = "/"): string {
  const normalised = path === "/" ? "" : path.replace(/^\/+/, "/");
  return locale === defaultLocale ? normalised || "/" : `/${locale}${normalised}`;
}

/** The same path under a different locale, for the language switcher. */
export function switchLocalePath(locale: Locale, pathname: string): string {
  const stripped = pathname.replace(/^\/(en|pt)(?=\/|$)/, "") || "/";
  return localePath(locale, stripped);
}
