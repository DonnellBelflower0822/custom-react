export default function createHashHistory() {
  let action
  const listeners = []

  const historyStack = []
  let historyIndex = 0
  let state

  function listen(listener) {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  window.addEventListener('hashchange', (e) => {
    const pathname = window.location.hash.slice(1)

    // 覆盖
    Object.assign(
      history,
      { location: { pathname, state }, action }
    )

    if (!action || action === 'PUSH') {
      historyStack[historyIndex++] = history.location
    }


    listeners.forEach(listener => {
      listener(history.location)
    })
  })

  function push(pathname, nextState) {
    action = "PUSH"

    if (typeof pathname === 'object') {
      state = pathname.state
      pathname = pathname.pathname
    } else {
      state = nextState
    }

    window.location.hash = pathname
  }

  function go(n) {
    action = "POP"
    historyIndex += n
    const nextLocation = historyStack[historyIndex]
    state = nextLocation.state
    window.location.hash = nextLocation.pathname
  }
  function goBack() {
    go(-1)
  }
  function goForward() {
    go(1)
  }

  const history = {
    // push PUSH
    // goBack POP
    action: 'POP',
    location: {
      pathname: window.location.hash ? window.location.hash.slice(1) : '/'
    },
    push,
    go,
    goBack,
    goForward,
    listen
  }

  return history
}