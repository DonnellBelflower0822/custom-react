const element1 = React.createElement(
  'div',
  {
    className: 'title',
    style: { color: 'red' }
  },
  React.createElement('span', null, 'hello'),
  'world'
)

ReactDOM.render(element1, document.getElementById('root'))