/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

const Text = Symbol();
const Fragment = Symbol();

const rendererOptions = {
  createElement: (type) => {
    return document.createElement(type);
  },
  insert: (el, parent) => {
    parent.appendChild(el);
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  createText(text) {
    return document.createTextNode(text);
  },
  setText(el, text) {
    el.nodeValue = text;
  },
  patchProps: (el: HTMLElement, key, prevValue, nextValue) => {
    const shouldSetAsProp = (el, key, value) => {
      // for property that is readonly, should not set dom property, this is only one case here
      if (key === "form" && el.tagName === "INPUT") return false;
      return key in el;
    };
    if (/^on/.test(key)) {
      const eventName = key.slice(2).toLowerCase();
      // 代理，避免频繁 dom 操作的性能开销
      const invokers = el._vei || (el._vei = {}); // vue event invoker
      let invoker = invokers[key];
      // 绑定事件前，移除旧事件
      if (nextValue) {
        if (!invoker) {
          invoker = el._vei[key] = (e) => {
            // 这里是预防事件冒泡机制导致的预料外的执行
            if (e.timeStamp < invoker.attached) return;
            // 这里是允许 props 中出现 `onClick={[() => alert(1), () => alert(2)]}` 的绑定
            if (Array.isArray(invoker.value)) {
              invoker.forEach((fn) => fn(e));
            } else {
              invoker.value(e);
            }
          };
          invoker.value = nextValue;
          invoker.attached = Performance.now();
          el.addEventListener(eventName, invoker);
        } else {
          // 性能提升点，避免频繁卸载和挂在 dom 的性能开销，因为纯 JS 执行性能比 DOM API 更优
          invoker.value = nextValue;
        }
      } else if (invoker) {
        el.removeEventListener(eventName, invoker);
      }
    } else if (shouldSetAsProp(el, key, nextValue)) {
      const propType = typeof el[key];
      if (propType === "boolean" && nextValue === "") {
        el[key] = true;
      } else {
        el[key] = nextValue;
      }
    } else {
      if (nextValue) {
        el.setAttribute(key, nextValue);
      } else {
        el.removeAttribute(key);
      }
    }
  },
};

export const createRenderer = ({
  createElement,
  createText,
  setText,
  insert,
  setElementText,
  patchProps,
} = rendererOptions) => {
  const mountElement = (vnode, container) => {
    const el = (vnode.el = createElement(vnode.type));
    if (typeof vnode.children === "string") {
      setElementText(el, vnode.children);
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child) => {
        // TODO: 这里假设了 children 中的每一项都是 vnode, 没有处理 [{ type: 'h1' ...}, 'Hello'] 这种场景中的字符串项
        patch(null, child, el);
      });
    }
    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key]);
      }
    }
    insert(el, container);
  };

  const patchElement = (n1, n2) => {
    const el = (n2.el = n1.el);
    const oldProps = n1.props;
    const newProps = n2.props;
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        patchProps(el, key, oldProps[key], newProps[key]);
      }
    }

    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProps(el, key, oldProps[key], null);
      }
    }

    patchChildren(n1, n2, el);
  };

  const patchChildren = (n1, n2, el) => {
    if (typeof n2.children === "string") {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c));
      }
      setElementText(el, n1.children);
    } else if (Array.isArray(n2, children)) {
      if (Array.isArray(n1, children)) {
        // TODO: diff here
      } else {
        setElementText(el, "");
        n2.children.forEach((c) => patch(null, c, el));
      }
    } else {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c));
      } else if (typeof n1.children === "string") {
        setElementText(el, "");
      }
    }
  };

  const unmount = (vnode) => {
    if (vnode.type === Fragment) {
      vnode.children.forEach((c) => unmount(c));
    }
    const parent = vnode?.el?.parentNode;
    if (parent) {
      parent.removeChild(vnode.el);
    }
  };
  /**
   * @param {Object} n1 - The old virtual node.
   * @param {Object} n2 - The new virtual node.
   * @param {HTMLElement} container - The container to render into.
   **/
  const patch = (n1, n2, container) => {
    if (n1 && n1.type !== n2.type) {
      umount(n1);
      n1 = null;
    }
    switch (typeof n2.type) {
      // string 说明是普通 HTML 标签
      case "string":
        if (!n1) {
          mountElement(n2, container);
        } else {
          patchElement(n1, n2);
        }
        break;
      case Text:
        if (!n1) {
          const el = n2.el = createText(n2.children);
          insert(el, container)
        } else {
          const el = n2.el = n1.el;
          if (n2.children !== n1.children) {
            setText(el, n2.children);
          }
        }
        break;
      case Fragment:
        if (!n1) {
          n2.children.forEach((c) => patch(null, n2, container));
        } else {
          patchChildren(n1, n2, container);
        }
        break;
      case "object":
        // TODO: 说明是组件
        break;
      default:
        return;
    }
  };
  const render = (vnode, container) => {
    // structure here
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        unmount(container._vnode);
      }
    }
    container._vnode = vnode;
  };
  return {
    render,
  };
};
