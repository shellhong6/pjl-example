var yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const argv = yargs.argv
const dir = argv.dir ? argv.dir : ''

const SRC_PATH = `../src/example/${dir}`
const DIST_PATH = `../dist`

module.exports = {
  srcPath: path.join(__dirname, SRC_PATH),
  distPath: path.join(__dirname, DIST_PATH),
  doPageConfig(webpackConfig) {
    let pageConfig = this.getPageConfig(this.srcPath, dir),
        config = {}
    pageConfig.map(page => {
      webpackConfig.entry[page.dir] = page.js
      config = {
        filename: path.join(this.distPath, `pages/${page.dir}.html`),
        template: page.html,
        inject: true,
        chunks: [page.dir],
        inlineSource: '.(js|css)$',
        // minify: {
        //   removeComments: true,
        //   collapseWhitespace: true,
        //   removeAttributeQuotes: true
        // },
        chunksSortMode: 'dependency'
      }
      webpackConfig.plugins.push(new HtmlWebpackPlugin(config))
    })
  },
  getPageConfig(rootPath, dir) {
    let info = [],
        subs = fs.readdirSync(rootPath)
    if (dir == '') {
      subs.forEach((item) => {
        info = [...info, ...this.getPageConfig(path.join(rootPath, item), item)]
      })
    } else {
      let name
      subs.forEach(function(item) {
        if (item.indexOf('.html') == -1) {
          return
        }
        name = item.replace('.html', '')
        info.push({
          dir,
          name,
          html: path.join(rootPath, `${name}.html`),
          js: path.join(rootPath, `${name}.js`)
        })
      })
    }
    return info
  },
}