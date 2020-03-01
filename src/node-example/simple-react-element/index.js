var ReactDOMServer = require('react-dom/server')
const React = require('react')

function getRElement (code) {
  let fn = new Function('React', `return ${code}`)
  return ReactDOMServer.renderToStaticMarkup(fn(React))
}

let code = `React.createElement("div", null, "hello world!")`
console.log('源码：', code)
console.log('转换后的html：', getRElement(code))