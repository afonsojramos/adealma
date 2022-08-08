const path = require('path');

// Workaround if config is included client side.
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'fr'],
  },
  ...(typeof window === 'undefined'
    ? { localePath: path.resolve('./public/locales') }
    : {}),
};
