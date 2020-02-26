module.exports = function (babel) {
  return {
    visitor: {
      JSXOpeningElement (path) {
        if (path.node.name.name == 'div') {
          console.log('path--', path)
        }
        path.node.name.name = 'input'
      }
    }
  }
}