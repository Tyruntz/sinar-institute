/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sinarinstitute.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/studio/', '/api/'] },
    ],
  },
  exclude: ['/privacy', '/terms', '/research-ethics'],
}
