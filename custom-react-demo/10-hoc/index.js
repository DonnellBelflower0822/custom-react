function withTracker(OldComponent) {
  return class extends CustomReact.Component {
    state = {
      x: 0,
      y: 0
    }

    render() {
      return (
        CustomReact.createElement('div', {
          onMouseMove: (e) => {
            this.setState({
              x: e.clientX,
              y: e.clientY,
            })
          }
        }, CustomReact.createElement(OldComponent, { ...this.state }))

      )
    }
  }
}

function Show(props) {
  return CustomReact.createElement(
    'div',
    null,
    CustomReact.createElement('h1', null, '移动鼠标'),
    CustomReact.createElement('p', null, `位置:${props.x}-${props.y}`),
  )
}

const Tracker = withTracker(Show)

CustomReact.render(
  CustomReact.createElement(Tracker),
  document.getElementById('root')
)
