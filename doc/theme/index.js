const corejsVersion = require('core-js/package.json').version
const { path,chalk } = require('@vuepress/shared-utils')
// Theme API.
module.exports = (options, ctx) => {
  const { sep } = path
  const { themeConfig, siteConfig, sourceDir } = ctx

  // resolve algolia
  const isAlgoliaSearch = (
    themeConfig.algolia
    || Object
        .keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
  )

  return {
    chainWebpack: config=> {
      config.module
        .rule('less')
        .oneOf('normal')
        .use('less-loader')
        .options({ javascriptEnabled: true })
        .end()
        .end()
        .oneOf('modules')
        .use('less-loader')
        .options({ javascriptEnabled: true })
      
      try{
        if (parseInt(corejsVersion.split('.',1)) > 2) {
          config.resolve.alias.set('core-js/library/fn', 'core-js/features')
        }
      }catch(err){
        console.log(`${chalk.blue('[AntDocs]')} path of ${chalk.green('core-js')} library convert failed: ${err}`)
      }
    },
    alias () {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js'),
        '@docs': `${sourceDir}${sep}.vuepress${sep}styles`
      }
    },
    plugins: [
      ['@vuepress/active-header-links', options.activeHeaderLinks],
      '@vuepress/plugin-search',
      '@vuepress/plugin-nprogress',
      ['container', {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP'
        }
      }],
      ['container', {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING'
        }
      }],
      ['container', {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING'
        }
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      }]
    ]
  }
}
