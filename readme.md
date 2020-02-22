# 原生js中使用jsx（还要零依赖，高性能）

## 前情提要

总会那么有一些情况下，不想大动干戈，引vue，引react，引angular等等，只想平平淡淡，用点原生开发！

但是原生开发，痛点也很多，不然也不会有那么多的库了。

用惯了组件，回到原生开发，你顶多用用js模板引擎，有点难受。

小时候，我的梦想是当科学家，而此时此刻，我的梦想是在原生开发中用上jsx，而且不用引入第三方库，性能还要杠杠的（在原生开发中用上jsx的好处，这里可以先脑补一下，补不出来的，请看下文讲解）。

人没有梦想和咸鱼有什么区别，更何况，这已然不是梦想，这里马上帮你实现！

## jsx

> JSX是一种JavaScript的语法扩展，运用于React架构中，其格式比较像是模版语言，但事实上完全是在JavaScript内部实现的。元素是构成React应用的最小单位，JSX就是用来声明React当中的元素，React使用JSX来描述用户界面。

上面文字引自百度百科，相信大部分人对jsx或多或少还是了解的。在react中，jsx编译流程是这样的：

+-----+     +-------+     +------------------------+
| jsx | --> | babel | --> | React.createElement(x) |
+-----+     +-------+     +------------------------+

而我想要的是：

+-----+     +--------------+     +------------+
| jsx | --> | p-jsx-loader | --> | js字符串拼接 |
+-----+     +--------------+     +------------+

## jsx组件例子

看上面，可能还是有点云里雾里，还是来几个例子实在、易懂。接下来就是见证奇迹的时候：

* 老规矩，第一个例子，先上`hello wolrd`:

```
// 源码
export default function (props) {
  return <div>hello world!</div>
}

// 如果是react，@babel/plugin-transform-react-jsx转换后
export default function (props) {
  return React.createElement("div", null, "hello world!");
}

// p-jsx-loader转换后
export default function (props) {
  return '<div>hello world!</div>';
}
```

* 带变量的例子

```
// 源码
export default function (props) {
  return <div>{props.name}</div>
}

// 如果是react，@babel/plugin-transform-react-jsx转换后
export default function (props) {
  return React.createElement("div", null, props.name);
}

// p-jsx-loader转换后
export default function (props) {
  return '<div>'+(props.name)+'</div>';
}
```

* 带逻辑的例子

```
// 源码
export default function (props) {
  let list = props.list
  if (list.length == 0) {
    return <div>暂无数据</div>
  }
  return list.map(function (item, index) {
    return <div>
      <span>当前序号为：{index}</span>
      <span>{item.hasDone ? "已完成" : "未完成"}</span>
    </div>
  }).join('')
}

// 如果是react，@babel/plugin-transform-react-jsx转换后
export default function (props) {
  let list = props.list;

  if (list.length == 0) {
    return React.createElement("div", null, "\u6682\u65E0\u6570\u636E");
  }

  return list.map(function (item, index) {
    return React.createElement("div", null, React.createElement("span", null, "\u5F53\u524D\u5E8F\u53F7\u4E3A\uFF1A", index), React.createElement("span", null, item.hasDone ? "已完成" : "未完成"));
  }).join('');
}

// p-jsx-loader转换后
export default function (props) {
  let list = props.list;

  if (list.length == 0) {
    return "<div>暂无数据</div>";
  }

  return list.map(function (item, index) {
    return "<div><span>当前序号为："+(index)+"</span><span>"+(item.hasDone ? "已完成" : "未完成")+"</span></div>";
  }).join('');
}
```

* 带组件的例子

```
// 源码，main.jsx
import Sub from './sub.jsx'

export default function (props) {
  return <div>
    <p>你好</p>
    welcome to：<Sub name={props.name} cls={props.cls} />
  </div>
}
// 源码，sub.jsx
import './index.css'

export default function (props) {
  return <span className={props.cls}>{props.name}</span>
}

// 如果是react，@babel/plugin-transform-react-jsx转换后，main.jsx
import Sub from './sub.jsx';
export default function (props) {
  return React.createElement("div", null, React.createElement("p", null, "\u4F60\u597D"), "welcome to\uFF1A", React.createElement(Sub, {
    name: props.name,
    cls: props.cls
  }));
}
// 如果是react，@babel/plugin-transform-react-jsx转换后，sub.jsx
import './index.css';
export default function (props) {
  return React.createElement("span", {
    className: props.cls
  }, props.name);
}

// p-jsx-loader转换后，main.jsx
import Sub from './sub.jsx';
export default function (props) {
  return '<div><p>你好</p>welcome to：'+Sub({"name":props.name,"cls":props.cls})+'</div>';
}
// p-jsx-loader转换后，sub.jsx
import './index.css';
export default function (props) {
  return '<span class="'+(props.cls)+'">'+(props.name)+'</span>';
}
```

## 使用jsx组件

jsx组件的使用，挺简单的，就已上边的`带组件的例子`为例：

```
import MyComponent from './components/welcome/main.jsx'

document.getElementById('root').innerHTML = MyComponent({
  name: '中国',
  cls: 'country'
})
```

## 总结

jsx组件转换成原生js代码是在构建阶段即完成了，然后到了浏览器端，其运行简单的程度，就类似于`document.getElementById('root').innerHTML = "<div>hello world</div>"`。依此看来，其零依赖，高性能显而易见。

本篇就讲到此处，看起来我的梦想是实现了，不知道是否合君意！