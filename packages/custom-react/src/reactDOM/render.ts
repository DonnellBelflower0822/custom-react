import { ClassReactNode, DOM, FunctionReactNode, ReactNode } from "../interface";
import { TEXT } from "../constant";
import { updateProps } from "./updateProps";
import { Component } from "../react/Component";
import { findDOM } from './findDOM';

export let scheduleUpdate = null;

export function render(reactNode: ReactNode, container: HTMLElement) {
  mount(reactNode, container);
  scheduleUpdate = () => {
    compareTwoVDom(container, reactNode, reactNode);
  };
}

function mount(reactNode: ReactNode, container: HTMLElement) {
  const dom = createDOM(reactNode);

  container.appendChild(dom);

  // 插入后才调用componentDidMount
  dom.componentDidMount?.();
}

function renderChildren(children: ReactNode[], container: HTMLElement) {
  children.forEach(child => {
    mount(child, container);
  });
}

// 挂载类组件
function mountClassComponent(reactNode: ClassReactNode) {
  const { type: Type, props } = reactNode;

  // 创建实例。走类组件的constructor
  const instance = new Type(props);

  if (reactNode.ref) {
    reactNode.ref.current = instance;
    instance.ref = reactNode.ref;
  }

  //@ts-ignore
  if (Type.contextType) {
    //@ts-ignore
    instance.context = Type.contextType.Provider._value;
  }

  instance.ownReactNode = reactNode;

  // 组件将要挂载
  // instance.componentWillMount?.();

  reactNode.instance = instance;

  // 调用render
  const renderReactNode = (instance as any as typeof Component & { render: () => ReactNode; }).render();

  instance.lastRenderReactNode = renderReactNode;

  // 生成真实dom
  const dom = createDOM(renderReactNode);

  //@ts-ignore
  if (instance.componentDidMount) {
    //@ts-ignore
    dom.componentDidMount = instance.componentDidMount.bind(instance);
  }

  instance.dom = dom;

  return dom;
}

// 挂载函数组件
function mountFunctionComponent(reactNode: FunctionReactNode) {
  const { type, props } = reactNode;

  const renderReactNode = type(props);
  // 生成真实dom
  const dom = createDOM(renderReactNode);

  reactNode.lastRenderReactNode = renderReactNode;

  return dom;
}

function createDOM(reactNode: ReactNode): DOM {
  const { type, ref, props: { children, content }, props } = reactNode;

  if (typeof type === 'function') {
    if ((type as any as typeof Component).isReactComponent) {
      return mountClassComponent(reactNode as any as ClassReactNode);
    }

    return mountFunctionComponent(reactNode as any as FunctionReactNode);
  }

  let dom: DOM;
  if (type === TEXT) {
    dom = document.createTextNode(typeof content === 'string' ? content : `${content}`);
  } else if (typeof type === "string") {
    // 创建节点
    dom = document.createElement(type);

    // 处理属性
    updateProps(dom, props);

    // 处理子级
    if (Array.isArray(children)) {
      renderChildren(children, dom);
    } else {
      mount(children, dom);
    }
  }

  reactNode.dom = dom;

  // ref赋值
  if (ref) {
    ref.current = dom;
  }

  return dom;
}


export function compareTwoVDom(parentDOM: HTMLElement, oldReactNode: ReactNode, newReactNode: ReactNode, nextDOM?: HTMLElement) {
  // 新旧节点都为null
  if (!newReactNode && !oldReactNode) {
    return;
  }

  // 新的为null，旧的不为null
  if (!newReactNode && oldReactNode) {
    const oldDom = findDOM(oldReactNode);

    if (oldDom) {
      parentDOM.removeChild(oldDom);
    }

    return;
  }

  // 老的为null，新的不为null
  if (!oldReactNode && newReactNode) {
    const newDOM = createDOM(newReactNode);

    parentDOM.insertBefore(newDOM, nextDOM || null);

    return;
  }

  // 新旧都有，但类型不一样
  if (oldReactNode.type !== newReactNode.type) {
    const oldDom = findDOM(oldReactNode);
    const newDOM = createDOM(newReactNode);

    parentDOM.replaceChild(newDOM, oldDom);
    return;
  }

  updateElement(oldReactNode, newReactNode);
}

function updateElement(oldReactNode: ReactNode, newReactNode: ReactNode) {
  const { type } = oldReactNode;
  // 文本
  if (type === TEXT) {
    const currentDOM = newReactNode.dom = oldReactNode.dom;
    currentDOM.textContent = newReactNode.props.content;
    return;
  }

  // 元素
  if (typeof type === 'string') {
    const currentDOM = newReactNode.dom = oldReactNode.dom;
    // 更新属性
    updateProps(currentDOM as HTMLElement, newReactNode.props, oldReactNode.props);

    updateChildren(currentDOM, oldReactNode.props.children, newReactNode.props.children);
    return;
  }

  if ((type as any as typeof Component).isReactComponent) {
    updateClassComponent(oldReactNode, newReactNode);
  } else {
    updateFunctionComponent(oldReactNode, newReactNode as FunctionReactNode);
  }
}

function updateClassComponent(oldReactNode: ReactNode, newReactNode: ReactNode) {
  const instance = newReactNode.instance = oldReactNode.instance;

  instance.updater.emitUpdate(newReactNode.props);
}
function updateFunctionComponent(oldReactNode: ReactNode, newReactNode: FunctionReactNode) {
  const parentDOM = findDOM(oldReactNode).parentNode;
  const { type, props } = newReactNode;
  let lastRenderReactNode = oldReactNode.lastRenderReactNode;
  const newRenderReactNode = type(props);
  compareTwoVDom(parentDOM, lastRenderReactNode, newRenderReactNode);
  newReactNode.lastRenderReactNode = newRenderReactNode;
}

function getArray<T>(item): T[] {
  return Array.isArray(item) ? item : [item];
}

function updateChildren(parentDOM: DOM, oldReactNodeChildren: ReactNode | ReactNode[], newReactNodeChildren: ReactNode | ReactNode[]) {
  oldReactNodeChildren = getArray<ReactNode>(oldReactNodeChildren);
  newReactNodeChildren = getArray<ReactNode>(newReactNodeChildren);

  const maxLength = Math.max(oldReactNodeChildren.length, newReactNodeChildren.length);
  for (let i = 0; i < maxLength; i++) {
    const nextDOM = oldReactNodeChildren.find((item, index) => index > i && item && item.dom);
    compareTwoVDom(parentDOM as HTMLElement, oldReactNodeChildren[i], newReactNodeChildren[i], (nextDOM && nextDOM.dom) as HTMLElement);
  }
}