import { DOM, ReactNode } from "../interface";
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
    if (pendingState.length > 0) {
      shouldUpdate<P, S>(instance, newProps, this.getState(), callbacks);
    }
  }
}

function shouldUpdate<P, S>(instance: Component<P, S>, newProps: P, nextState: S, callbacks: SetStateCallback[]) {

  if (newProps) {
    instance.props = newProps;
  }

  // 设置最新的state
  instance.state = nextState;

  // 更新组件
  instance.updateComponent();

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

  constructor(props: P) {
    this.props = props;
    this.updater = new Updater<P, S>(this);
  }

  setState(partialState: PartialState<S, P>, callback: SetStateCallback) {
    this.updater.addState(partialState, callback);
  }

  dom?: DOM;

  updateComponent() {
    const renderReactNode = (this as any as typeof Component & { render: () => ReactNode; }).render();

    const oldDom = findDOM(this.lastRenderReactNode);

    compareTwoVDom(
      oldDom ? oldDom.parentNode : null,
      this.lastRenderReactNode,
      renderReactNode
    );

    this.lastRenderReactNode = renderReactNode;
  }
}
