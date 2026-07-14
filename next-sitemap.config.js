/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://adealma.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  // Next.js exposes the dynamic template in its build manifest alongside the
  // concrete prerendered project pages. Never advertise the literal template.
  exclude: ['/projects/[slug]'],
};
