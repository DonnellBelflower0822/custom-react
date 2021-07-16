import {DOM, ReactNode} from "../interface";
import {TEXT} from "../constant";
import {updateProps} from "./updateProps";

export function render(reactNode: ReactNode, container: HTMLElement) {
    mount(reactNode, container)
}

function mount(reactNode: ReactNode, container: HTMLElement) {
    const dom = createDOM(reactNode)

    container.appendChild(dom)
}

function renderChildren(children: ReactNode[], container: HTMLElement) {
    children.forEach(child => {
        mount(child, container)
    })
}

function createDOM(reactNode: ReactNode) {
    const {type, props: {children, content}, props} = reactNode

    if (typeof type === 'function') {

    }

    let dom: DOM
    if (type === TEXT) {
        dom = document.createTextNode(typeof content === 'string' ? content : `${content}`)
    } else if (typeof type === "string") {
        // 创建节点
        dom = document.createElement(type)

        // 处理属性
        updateProps(dom, props)

        // 处理子级
        if (Array.isArray(children)) {
            renderChildren(children, dom)
        } else {
            mount(children, dom)
        }
    }

    reactNode.dom = dom

    return dom
}
