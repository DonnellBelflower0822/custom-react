import { Props, ReactNode } from "../interface";
import { TEXT } from "../constant";

export function createElement(type, props: Props = {}, ...children): ReactNode {
  const { key, ref, ...extProps } = props || {};
  const reactNode: ReactNode = {
    type,
    ref,
    props: {
      ...extProps,
    }
  };

  /**
   * createElement('div',{},'hello')
   * createElement('div',{},createElement('div',{},))
   * createElement('div',{},createElement('div',{},),createElement('div',{}))
   * createElement('div',{},[createElement('div',{},),createElement('div',{})])
   */
  if (children.length === 1) {
    if (children[0] !== undefined) {
      reactNode.props.children = wrapChildren(children[0]);
    }
  } else {
    reactNode.props.children = children.map(wrapChildren);
  }

  return reactNode;
}

function wrapChildren(child: string | number | ReactNode): ReactNode {
  if (typeof child === 'string' || typeof child === 'number') {
    return { type: TEXT, props: { content: typeof child === 'string' ? child : `${child}` } };
  }

  return child;
}
