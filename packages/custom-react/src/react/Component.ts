import {DOM} from "../interface";

export class Component<P = object, S = object> {
    static isReactComponent = true
    private props: P;

    constructor(props: P) {
        this.props = props
    }

    setState() {
    }

    dom?: DOM

    // render
}
