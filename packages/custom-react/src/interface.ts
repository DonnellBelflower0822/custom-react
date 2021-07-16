export type ReactNodeType = string | Symbol | ReactNode

type extendDOM = {}

export type DOM = (HTMLElement & extendDOM) | (Text & extendDOM)

export type Props = {
    children?: ReactNode[] | ReactNode
    content?: string | number
    [x: string]: any
}

export interface ReactNode {
    type: ReactNodeType,
    props: Props,
    key?: string;

    // 真实的dom
    dom?: DOM
}
