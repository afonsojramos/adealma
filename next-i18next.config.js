const path = require('node:path');

// Workaround if config is included client side.
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
  },
  ...(typeof window === 'undefined'
    ? { localePath: path.resolve('./public/locales') }
    : {}),
};
