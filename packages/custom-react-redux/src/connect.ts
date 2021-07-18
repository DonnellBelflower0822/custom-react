import CustomReact from 'custom-react';
import CustomRedux from 'custom-redux';
import ReduxContext from './ReduxContext';

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (oldComponent) {
    return function (props) {
      //@ts-ignore
      // 使用redux的store
      const { store } = CustomReact.useContext(ReduxContext);

      // 映射
      const state = store.getState();
      const stateProps = mapStateToProps(state);

      // 将dispatch放到props上
      const dispatchProps = CustomReact.useMemo(() => {
        if (typeof mapDispatchToProps === 'object') {
          // 绑定dispatch
          return CustomRedux.bindActionCreators(mapDispatchToProps, store.dispatch);
        }

        if (typeof mapDispatchToProps === 'function') {
          // 如果是函数值调用，并且将dispatch作为参数
          return mapDispatchToProps(store.dispatch);
        }

        // 没有传递则传递dispatch
        return {
          dispatch: store.dispatch
        };
      }, [store.dispatch]);

      // 强制更新
      const [, forceUpdate] = CustomReact.useReducer(x => x + 1, 0);

      CustomReact.useEffect(() => {
        // 订阅更新
        const unsubscribe = store.subscribe(forceUpdate);
        // 销毁
        return unsubscribe;
      }, [store]);

      return CustomReact.createElement(oldComponent,
        { ...props, ...stateProps, ...dispatchProps }
      );
    };
  };
}

export function connect2(mapStateToProps, mapDispatchToProps) {
  return function (oldComponent) {
    return class extends CustomReact.Component {
      static contextType = ReduxContext;
      unsubscibe: any;
      componentDidMount() {
        // 订阅
        // @ts-ignore
        this.unsubscibe = this.context.store.subscribe(() => {
          // 强制刷新
          this.setState({});
        });
      }
      componentWillUnmount() {
        // 销毁
        this.unsubscibe();
      }
      render() {
        //@ts-ignore
        const { getState, dispatch } = this.context.store;
        const state = getState();
        const stateProps = mapStateToProps(state);
        const dispatchProps = CustomRedux.bindActionCreators(mapDispatchToProps, dispatch);

        return CustomReact.createElement(
          oldComponent,
          { ...this.props, ...stateProps, ...dispatchProps }
        );
      }
    };
  };
}