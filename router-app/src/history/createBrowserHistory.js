export default function createBrowserHistory() {
  const listeners = []

  function listen(listener) {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  window.addEventListener('popstate', (e) => {
    setState(
      {
        pathname: window.location.pathname,
        state: window.location.state,
      },
      'POP'
    )
  })

  const gloablHistory = window.history
  let action
  let state
  function push(pathname, nextState) {
    action = "PUSH"

    if (typeof pathname === 'object') {
      state = pathname.state
      pathname = pathname.pathname
    } else {
      state = nextState
    }

    gloablHistory.pushState(state, null, pathname)
    const location = { pathname }
    setState(location, action)
  }

  function setState(location, action) {
    Object.assign(history, { location, action })
    listeners.forEach(listener => {
      listener(history.location)
    })
  }

  const history = {
    // push PUSH
    // goBack POP
    action: 'POP',
    location: {
      pathname: window.location.pathname
    },
    push,
    go: gloablHistory.go,
    goBack: gloablHistory.back,
    goForward: gloablHistory.forward,
    listen
  }

  return history
}