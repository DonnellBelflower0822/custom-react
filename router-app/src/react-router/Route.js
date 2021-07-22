import React from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

/**
 * 1. 获取context
 * 2. 匹配路由规则 props.path 和 location.pathname
 * 3. 如果相等就渲染组件。否则就不渲染任何东西
 */
class Route extends React.Component {
  static contextType = RouterContext

  render() {
    const { history, location } = this.context
    // exact, 
    const { component: Component } = this.props
    let matched = matchPath(location.pathname, this.props)

    if (!matched) {
      return null
    }

    const routerProps = {
      history,
      location,
      match: {}
    }

    return <Component {...routerProps} />
  }
}

export default Route