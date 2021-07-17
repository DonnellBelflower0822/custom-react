const MyContext = CustomReact.createContext()

function Hand() {
  return CustomReact.createElement(
    MyContext.Consumer,
    null,
    (context) => {
      return CustomReact.createElement(
        'div',
        {
          style: {
            color: context.color,
          }
        },
        CustomReact.createElement('button', {
          onClick: () => {
            context.changeColor('red')
          }
        }, '变红'),
        CustomReact.createElement('button', {
          onClick: () => {
            context.changeColor('green')
          }
        }, '变绿' + context.arr)
      )
    }
  )
}

class Eye extends CustomReact.Component {
  static contextType = MyContext

  render() {
    return CustomReact.createElement(
      'div',
      {
        style: {
          color: this.context.color,
        }
      },
      CustomReact.createElement('button', {
        onClick: () => {
          this.context.changeColor('red')
        }
      }, '变红'),
      CustomReact.createElement('button', {
        onClick: () => {
          this.context.changeColor('green')
        }
      }, '变绿' + this.context.arr)
    )
  }
}
class Head extends CustomReact.Component {
  static contextType = MyContext
  render() {
    return CustomReact.createElement(
      'div',
      {

        style: {
          color: this.context.color,
        }
      },
      CustomReact.createElement(Hand),
      CustomReact.createElement(Eye)
    )
  }
}
class Footer extends CustomReact.Component {
  static contextType = MyContext
  render() {
    return CustomReact.createElement(
      'div',
      {
        color: this.context.color
      },
      CustomReact.createElement('div', null, 'Footer')
    )
  }
}
class Body extends CustomReact.Component {
  static contextType = MyContext
  render() {
    return CustomReact.createElement(
      'div',
      {

        style: {
          color: this.context.color,
        }
      },
      CustomReact.createElement('div', {}, 'Body'),
      CustomReact.createElement(Footer)
    )
  }
}

class Person extends CustomReact.Component {
  state = {
    color: 'red',
    arr: [1, 2, 3]
  }

  changeColor = (color) => {
    const { arr } = this.state
    arr.push(2)
    this.setState({ color, arr })
  }

  render() {
    return (
      CustomReact.createElement(
        MyContext.Provider,
        {
          value: {
            color: this.state.color,
            changeColor: this.changeColor,
            arr: this.state.arr
          }
        },
        CustomReact.createElement('div', {}, [
          CustomReact.createElement(Head),
          CustomReact.createElement(Body),
        ])
      )

    )
  }
}

CustomReact.render(CustomReact.createElement(Person), document.getElementById('root'))
