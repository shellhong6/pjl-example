// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
// https://babeljs.io/docs/en/babel-types
// https://juejin.im/post/5e32502ae51d450268661152
// https://astexplorer.net/
// https://juejin.im/post/5a17d51851882531b15b2dfc
// https://juejin.im/user/58b44bcb8ac2475ccb5de9ee/posts
// https://juejin.im/post/5bee61f4e51d4549fb349e29
// 
const createVisitor = (t) => {
  const visitor = {}
  visitor.JSXElement = {
      exit(path, file){
          let openingPath = path.get("openingElement")
          let children = t.react.buildChildren(openingPath.parent)
          let targetName = openingPath.node.name.name
          let childrenExpr = children[0]
          if (children.length > 1) {
            for (let i = 1, ilen = children.length; i < ilen; i++) {
              childrenExpr = t.binaryExpression('+', childrenExpr, children[i])
            }
          }
          let bExpr = t.binaryExpression('+', t.stringLiteral(`<${targetName}>`), t.binaryExpression('+', childrenExpr, t.stringLiteral(`</${targetName}>`)))

          // let tagNode = t.identifier(openingPath.node.name.name)
          // // 创建React.createElement
          // let createElement =  t.memberExpression(t.identifier("React"),t.identifier("createElement"))
          // // 创建属性
          // let attribs = buildAttrsCall(openingPath.node.attributes, t)
          // // 创建React.createElement(tag, attrs, ...chidren)表达式
          // let callExpr = t.callExpression(createElement, [tagNode, attribs, ...children])
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