import { Props } from "../interface";

export function updateProps(dom: HTMLElement, newProps: Props, oldProps?: Props) {
  if (!newProps) {
    return;
  }

  for (const key in newProps) {
    if (['children', 'content'].includes(key)) {
      continue;
    }

    // 新旧一致
    if (oldProps && newProps[key] === oldProps[key]) {
      continue;
    }

    if (key === 'style') {
      const { style } = newProps;
      for (const attr in style) {
        dom.style[attr] = style[attr];
      }

      continue;
    }

    if (key.startsWith('on')) {
      // addEvent
      continue;
    }

    dom.setAttribute(key, newProps[key]);
  }

  if (oldProps) {
    for (const key in oldProps) {
      if (!newProps[key]) {
        dom.removeAttribute(key);
      }
    }
  }
}
