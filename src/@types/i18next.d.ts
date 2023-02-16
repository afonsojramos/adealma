import 'i18next';

import type common from '../../public/locales/en/common.json';
import type projects from '../../public/locales/en/projects.json';

interface I18nNamespaces {
  common: typeof common;
  projects: typeof projects;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: I18nNamespaces;
  }
}
