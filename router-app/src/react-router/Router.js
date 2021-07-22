import React from 'react';
import RouterContext from './RouterContext';

class Router extends React.Component {
  static computedRootMatch(pathname) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/'
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      location: props.history.location
    }

    // 监听历史对象中的路径变化
    this.unlisten = props.history.listen((location) => {
      // 刷新
      this.setState({ location })
    })
  }

  componentWillUnmount() {
    this.unlisten?.()
  }

  render() {
    const value = {
      location: this.state.location,
      history: this.props.history,
      match: Router.computedRootMatch(this.state.location.pathcname)
    }

    return (
      <RouterContext.Provider value={value}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}

export default Router