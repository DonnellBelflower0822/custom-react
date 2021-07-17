import { createElement } from "./react/createElement";
import { Component, PureComponent, memo } from "./react/Component";
import { render } from "./reactDOM/render";
import { createRef } from './react/createRef';
import { forwardRef } from './react/forwardRef';
import { createContext } from './react/createContext';
import * as hooks from './hooks';

const customReact = {
  createElement,
  render,
  Component,
  PureComponent,
  createRef,
  createContext,
  memo,
  forwardRef,
  ...hooks
};

export default customReact;
