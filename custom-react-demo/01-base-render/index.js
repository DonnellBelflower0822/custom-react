const element1 = CustomReact.createElement(
  'div',
  {
    className: 'title',
    style: { color: 'red' }
  },
    CustomReact.createElement('span', null, 'hello'),
  'world'
)

CustomReact.render(element1, document.getElementById('root'))
