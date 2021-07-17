import { ClassReactNode, DOM, ReactNode } from "../interface";
import { findDOM } from '../reactDOM/findDOM';
import { compareTwoVDom } from '../reactDOM/render';

type GetState<S, P> = (state: S, props: P) => S;
type SetStateCallback = () => void;
type PartialState<S, P> = S | GetState<S, P>;

export const updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set<Updater>(),
  batchUpdate() {
    for (const updater of this.updaters) {
      updater.updateClassComponent();
    }
    this.isBatchingUpdate = false;
    this.updaters.length = 0;
  }
};

class Updater<P = object, S = object> {
  instance: Component<P, S>;
  pendingState: PartialState<S, P>[];
  callbacks: SetStateCallback[];
  newProps: P;

  constructor(instance: Component<P, S>) {
    this.instance = instance;
    this.pendingState = [];
    this.callbacks = [];
  }

  addState(partialState: PartialState<S, P>, callback: SetStateCallback) {
    this.pendingState.push(partialState);

    if (callback) {
      this.callbacks.push(callback);
    }

    this.emitUpdate();
  }

  emitUpdate(newProps?: P) {
    this.newProps = newProps;
    if (updateQueue.isBatchingUpdate) {
      // 批量更新模式
      // 往更新队列里面增加当前更新
      updateQueue.updaters.add(this as any as Updater<object, object>);
    } else {
      // 不是批量更新模式，直接更新
      this.updateClassComponent();
    }
  }

  // 获取最新的state
  getState() {
    const { instance, pendingState } = this;

    let { state, props } = instance;
    pendingState.forEach(nextState => {
      // 处理setState传递函数的情况
      if (typeof nextState === 'function') {
        nextState = nextState.call(instance, state, props);
      }

      state = {
        ...state,
        ...nextState
      };
    });

    pendingState.length = 0;
    return state;
  }

  updateClassComponent() {
    const { instance, pendingState, newProps, callbacks } = this;
    if (newProps || pendingState.length > 0) {
      shouldUpdate<P, S>(instance, newProps, this.getState(), callbacks);
    }
  }
}

// 不管组件是否要更新，props和state都要更新
function shouldUpdate<P, S>(instance: Component<P, S>, newProps: P, nextState: S, callbacks: SetStateCallback[]) {
  //@ts-ignore
  const { getDerivedStateFromProps } = instance.ownReactNode.type;
  if (getDerivedStateFromProps) {
    const partialState = getDerivedStateFromProps(newProps, instance.state);
    nextState = {
      ...nextState,
      ...partialState,
    };
  }

  // 设置最新的state
  instance.state = nextState;

  // shouldComponentUpdate(组件是否要更新)返回false，则不需要更新

  //@ts-ignore
  if (instance.shouldComponentUpdate && !instance.shouldComponentUpdate(newProps, nextState)) {
    return;
  }

  if (newProps) {
    instance.props = newProps;
  }

  // 更新组件
  instance.forceUpdate();

  callbacks.forEach(cb => {
    cb();
  });

  callbacks.length = 0;
}

export class Component<P = object, S = object> {
  static isReactComponent = true;
  props: P;
  state: S;

  updater: Updater<P, S>;
  lastRenderReactNode: ReactNode;
  ownReactNode: ClassReactNode;
  ref?: any;

  constructor(props: P) {
    this.props = props;
    this.updater = new Updater<P, S>(this);
  }

  setState(partialState: PartialState<S, P>, callback: SetStateCallback) {
    this.updater.addState(partialState, callback);
  }

  dom?: DOM;

  forceUpdate() {
    // this.componentWillUpdate?.();
    const renderReactNode = (this as any as typeof Component & { render: () => ReactNode; }).render();

    const oldDom = findDOM(this.lastRenderReactNode);

    // @ts-ignore
    const extrArgs = this.getSnapshotBeforeUpdate?.();

    compareTwoVDom(
      oldDom ? oldDom.parentNode : null,
      this.lastRenderReactNode,
      renderReactNode
    );

    this.lastRenderReactNode = renderReactNode;
    //@ts-ignore
    this.componentDidUpdate?.(prevProps, prevState, extrArgs);
  }
}

export class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const res = !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    return res;
  }
}

function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key in obj1) {
    if (key === 'children') {
      continue;
    }

    if (obj2[key] !== obj1[key]) {
      return false;
    }
  }
  return true;
}

export function memo(FunctionComponent, compare: (prevProps, nextProps) => boolean) {
  if (compare) {
    return class extends Component {
      shouldComponent(nextProps) {
        return compare(this.props, nextProps);
      }
      render() {
        return FunctionComponent(this.props);
      }
    };
  }

  return class extends PureComponent {
    render() {
      return FunctionComponent(this.props);
    }
  };
}