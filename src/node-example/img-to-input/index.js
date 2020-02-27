const babel = require("@babel/core")
const myJsxPlugins = require('./plugin-transform-jsx')

var handleJsx = function (source) {
  var result = babel.transform(source, {
    plugins: ['@babel/plugin-syntax-jsx', myJsxPlugins]
  })
  return result.code
}

let code = handleJsx(`<img/>`)
console.log('转换前代码--', `<img/>`)
console.log('转换后代码--', code)