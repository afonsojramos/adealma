// The residue after EmDash takes the content.
//
// EmDash localises content itself (row-per-locale), so project copy, page copy
// and about text all live in the CMS. What is left is six labels that are part
// of the interface rather than the content, and are not worth a whole i18n
// toolchain: critical-mass uses Paraglide because it has ~50 such strings, and
// this site has six. Add Paraglide if that ever stops being true.
export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

const ui = {
  pt: {
    location: "Localização",
    status: "Estado",
    year: "Ano",
    sold: "vendido",
    ongoing: "em curso",
    on_sale: "à venda",
  },
  en: {
    location: "Location",
    status: "Status",
    year: "Year",
    sold: "sold",
    ongoing: "ongoing",
    on_sale: "on sale",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)[typeof defaultLocale];

export function isLocale(value: string | undefined): value is Locale {
  // Widened rather than asserted: `includes` on the narrow tuple type would
  // need a cast that hides the very case this guard exists to catch.
  return value !== undefined && (locales as readonly string[]).includes(value);
}

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}
