import { Component } from './Component';

export function forwardRef(FunctionComponent) {
  return class extends Component {
    render() {
      if (FunctionComponent.length < 2) {
        console.error('aaaa');
      }
      //@ts-ignore
      return FunctionComponent(this.props, this.ref);
    }
  };
}