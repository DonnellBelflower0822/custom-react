import { ClassReactNode, DOM, FunctionReactNode, ReactNode } from "../interface";
import { TEXT } from "../constant";
import { updateProps } from "./updateProps";
import { Component } from "../react/Component";

export function render(reactNode: ReactNode, container: HTMLElement) {
  mount(reactNode, container);
}

function mount(reactNode: ReactNode, container: HTMLElement) {
  const dom = createDOM(reactNode);

  container.appendChild(dom);
}

function renderChildren(children: ReactNode[], container: HTMLElement) {
  children.forEach(child => {
    mount(child, container);
  });
}

// 挂载类组件
function mountClassComponent(reactNode: ClassReactNode) {
  const { type: Type, props } = reactNode;

  // 创建实例
  const instance = new Type(props);

  reactNode.instance = instance;

  // 调用render
  const renderReactNode = (instance as any as typeof Component & { render: () => ReactNode; }).render();

  // 生成真实dom
  const dom = createDOM(renderReactNode);

  instance.dom = dom;

  return dom;
}

// 挂载函数组件
function mountFunctionComponent(reactNode: FunctionReactNode) {
  const { type, props } = reactNode;

  const renderReactNode = type(props);
  // 生成真实dom
  const dom = createDOM(renderReactNode);

  reactNode.dom = dom;

  return dom;
}

function createDOM(reactNode: ReactNode): DOM {
  const { type, props: { children, content }, props } = reactNode;

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

  return dom;
}
