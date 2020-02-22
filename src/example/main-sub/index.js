import MyComponent from '../../components/main-sub/main.jsx'

document.getElementById('root').innerHTML = MyComponent({
  name: '中国',
  cls: 'country'
})