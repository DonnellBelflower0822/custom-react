import { Component } from "./react/Component";

export type FunctionComponent<T = object> = (props: T) => ReactNode;

export type ReactNodeType = string | Symbol | Component | FunctionComponent;

type extendDOM = {
  store?: {
    [eventType: string]: () => void;
  };
};

export type DOM = (HTMLElement & extendDOM) | (Text & extendDOM);

export type Props = {
  children?: ReactNode[] | ReactNode;
  content?: string;
  [x: string]: any;
};

export interface ReactNode {
  type: ReactNodeType,
  props: Props,
  key?: string;

  // 真实的dom
  dom?: DOM;
  instance?: Component;
}

export interface ClassReactNode extends Omit<ReactNode, 'type'> {
  type: typeof Component & {
    render: () => ReactNode;
  };
}

export interface FunctionReactNode extends Omit<ReactNode, 'type'> {
  type: FunctionComponent;
}
