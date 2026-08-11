export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const ui = {
  pt: {
    location: "Localização",
    status: "Estado",
    year: "Ano",
    sold: "vendido",
    ongoing: "em curso",
    on_sale: "para venda",
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
  return value !== undefined && (locales as readonly string[]).includes(value);
}

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}
