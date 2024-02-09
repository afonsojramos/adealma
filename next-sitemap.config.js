/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://adealma.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
};
