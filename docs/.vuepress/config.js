module.exports = {
  title: 'ERS Documentation',
  description: 'How toes, Usage documentation, Coding guidelines: general principles, C#, Javascript and Vuejs.',
  base: '/ers-documentation/',
  head: [
    ['link', { rel: 'icon', href: '/ers-logo.png' }]
  ],
  markdown: {
    toc: { includeLevel: [2, 3] }
  },
  themeConfig: {
    displayAllHeaders: true,
    editLinks: true,
    repo: 'EuropeanRespiratorySociety/documentation',
    docsDir: 'docs',
    editLinkText: 'Help us improve this page!',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Cloud CMS', items: [
          {
            text: 'documentation', link: '/cloud-cms/'
          },
          {
            text: 'connect', link: 'https://ers.cloudcms.net'
          }
        ]
      }
    ],
    sidebar: [{
      title: 'Cloud CMS',
      children: [
        ['/cloud-cms/', 'Cloud CMS'],
        ['/cloud-cms/create-or-edit-an-article', 'Create or Edit an Item'],
        ['/cloud-cms/edit-an-image', 'Edit an image'],
        ['/cloud-cms/events-calendar', 'Events Calendar'],
        ['/cloud-cms/publish-a-notification', 'Notifications'],
      ]
    },
    {
      title: 'Coding Guidelines',
      children: [
        ['/coding-guidelines/general-principles', 'General Principles'],
        ['/coding-guidelines/c-sharp', 'C#'],
        ['/coding-guidelines/javascript', 'JavaScript'],
        ['/coding-guidelines/vuejs', 'VueJs']
      ]
    }]
  }
}