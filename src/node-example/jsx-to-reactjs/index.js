const babel = require("@babel/core")
const myJsxPlugins = require('./plugin-transform-jsx')

var handleJsx = function (source) {
  var result = babel.transform(source, {
    plugins: ['@babel/plugin-syntax-jsx', myJsxPlugins]
  })
  return result.code
}

let code = handleJsx(`
const a = <div className="container" data-id='id'>
    <p>1</p>
    <span>2</span>
</div>;
`)
console.log('code--', code)