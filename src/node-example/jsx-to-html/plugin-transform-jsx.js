// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
// https://babeljs.io/docs/en/babel-types
// https://juejin.im/post/5e32502ae51d450268661152
// https://astexplorer.net/
// https://juejin.im/post/5a17d51851882531b15b2dfc
// https://juejin.im/user/58b44bcb8ac2475ccb5de9ee/posts
// https://juejin.im/post/5bee61f4e51d4549fb349e29

function createExpr (arr, t) {
  let expr = arr[0]
  if (arr.length > 1) {
    for (let i = 1, ilen = arr.length; i < ilen; i++) {
      expr = t.binaryExpression('+', expr, arr[i])
    }
  }
  return expr
}
function transformAttr (attrName) {
  switch (attrName) {
    case 'className':
      return 'class'
  }
  return attrName
}
function createAttributesStr (attributes) {
  return attributes.map(function (attr) {
    return ` ${transformAttr(attr.name.name)}="${attr.value.value}"`
  }).join('')
}
function createVisitor (t) {
  const visitor = {}
  visitor.JSXElement = {
      exit(path, file){
          let openingPath = path.get("openingElement"),
              children = t.react.buildChildren(openingPath.parent),
              targetName = openingPath.node.name.name,
              attributes = openingPath.node.attributes
          let bExpr = createExpr([
            t.stringLiteral(`<${targetName}${createAttributesStr(attributes)}>`),
            createExpr(children, t),
            t.stringLiteral(`</${targetName}>`)
          ], t)
          path.replaceWith(t.inherits(bExpr, path.node))
      }
  }
  return {
      visitor
  }
}
module.exports = function(babel){
  const t = babel.types
  return createVisitor(t)
}