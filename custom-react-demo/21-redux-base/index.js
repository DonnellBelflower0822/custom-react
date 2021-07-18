const ADD = 'ADD'
const DESC = 'DESC'

function reducer(state = { number: 1 }, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 }
    case DESC:
      return { number: state.number - 1 }
    default:
      return state
  }
}

const store = CustomRedux.createStore(reducer, { number: 0 })

function render() {
  root.innerHTML = store.getState().number
}

render()

store.subscribe(render)

const add = document.getElementById('add')
add.addEventListener('click', () => {
  store.dispatch({ type: ADD })
})

const desc = document.getElementById('desc')
desc.addEventListener('click', () => {
  store.dispatch({ type: DESC })
})