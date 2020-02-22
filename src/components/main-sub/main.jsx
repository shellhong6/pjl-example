import Sub from './sub.jsx'

export default function (props) {
  return <div>
    <p>你好</p>
    welcome to：<Sub name={props.name} cls={props.cls} />
  </div>
}