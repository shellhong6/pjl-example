function sayHi (event) {
  let { name } = event.target.dataset
  alert(`Hi,i am ${name}. Nice to meet you!`)
}
export default function (props) {
  return <button data-name={props.name} onClick={sayHi}>say hello</button>
}