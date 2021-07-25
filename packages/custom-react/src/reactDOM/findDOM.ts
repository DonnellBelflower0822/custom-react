import { ReactNode } from '../interface';
import { Component } from '../react/Component';

// 查找此虚拟dom对应的真实dom
export function findDOM(vdom: ReactNode) {
  if (!vdom) {
    return;
  }
  const { type } = vdom;

  let dom;
  if (typeof type === 'function') {
    if ((type as any as Component).isReactComponent) {
      dom = findDOM(vdom.instance as any as ReactNode);
    } else {
      dom = findDOM(vdom.lastRenderReactNode);
    }
  } else {
    dom = vdom.dom;
  }

  return dom;
}