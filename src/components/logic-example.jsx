export default function (props) {
  let list = props.list
  if (list.length == 0) {
    return <div>暂无数据</div>
  }
  return list.map(function (item, index) {
    return <div>
      <span>任务{index}</span>
      <span>{item.hasDone ? "已完成" : "未完成"}</span>
    </div>
  }).join('')
}