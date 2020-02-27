function buildElementCall(path, t) {
  let openingPath = path.get("openingElement"),
      children = t.react.buildChildren(openingPath.parent),
      tagNode = t.identifier(openingPath.node.name.name),
      createElement = t.memberExpression(t.identifier("React"), t.identifier("createElement")),
      attribs = openingPath.node.attributes
  console.log('children--', children)
  if (attribs.length) {
    attribs = buildOpeningElementAttributesExpr(attribs, t)
  } else {
    attribs = t.nullLiteral()
  }
  let callExpr = t.callExpression(createElement, [tagNode, attribs, ...children])
  path.replaceWith(t.inherits(callExpr, path.node))
}
function convertAttribute (node, t) {
  return t.objectProperty(t.stringLiteral(node.name.name), node.value)
}
function buildOpeningElementAttributesExpr (attribs, t) {
  let _props = []
  while (attribs.length) {
    _props.push(convertAttribute(attribs.shift(), t))
  }
  return t.ObjectExpression(_props)
}

module.exports = function (babel) {
  const t = babel.types
  return {
    visitor: {
      JSXElement: {
        exit (path) {
          buildElementCall(path, t)
        }
      }
    }
  }
}