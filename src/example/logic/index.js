import MyComponent from '../../components/logic-example.jsx'

document.getElementById('root').innerHTML = MyComponent({
  list: [
    {
      hasDone: true
    }, {
      hasDone: false
    }
  ]
})