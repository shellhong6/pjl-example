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
          path.replaceWith(bExpr)
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