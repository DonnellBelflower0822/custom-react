import CustomReact from 'custom-react';
import CustomRedux from 'custom-redux';
import ReduxContext from './ReduxContext';

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (oldComponent) {
    return function (props) {
      //@ts-ignore
      const { store } = CustomReact.useContext(ReduxContext);
      const { getState } = store;

      // 映射
      const state = getState();
      const stateProps = mapStateToProps(state);

      const dispatchProps = CustomReact.useMemo(() => {
        if (typeof mapDispatchToProps === 'object') {
          return CustomRedux.bindActionCreators(mapDispatchToProps, store.dispatch);
        }

        if (typeof mapDispatchToProps === 'function') {
          return mapDispatchToProps(store.dispatch);
        }

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
        // @ts-ignore
        this.unsubscibe = this.context.store.subscribe(() => {
          this.setState({});
        });
      }
      componentWillUnmount() {
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