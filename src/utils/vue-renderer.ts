/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

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
  patchProps: (el: HTMLElement, key, prevValue, nextValue) => {
    const shouldSetAsProp = (el, key, value) => {
      // for property that is readonly, should not set dom property, this is only one case here
      if (key === "form" && el.tagName === "INPUT") return false;
      return key in el;
    };
    if (/^on/.test(key)) {
      const eventName = key.slice(2).toLowerCase();
      // 代理，避免频繁 dom 操作的性能开销
      const invokers = el._vei || (el._vei = {}) // vue event invoker
      let invoker = invokers[key]
      // 绑定事件前，移除旧事件
      if (nextValue) {
        if (!invoker) {
          invoker = el._vei[key] =  (e) => {
            // 这里是预防事件冒泡机制导致的预料外的执行
            if (e.timeStamp < invoker.attached) return;
            // 这里是允许 props 中出现 `onClick={[() => alert(1), () => alert(2)]}` 的绑定
            if (Array.isArray(invoker.value)) {
              invoker.forEach(fn => fn(e));
            } else {
              invoker.value(e);
            }
          };
          invoker.value = nextValue;
          invoker.attached = Performance.now();
          el.addEventListener(eventName, invoker)
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
      el.setAttribute(key, nextValue);
    }
  },
};

export const createRenderer = ({
  createElement,
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
  const unmount = (vnode) => {
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
          // TODO: n1 exists, update logic here
        }
        break;
      case "object":
      // TODO: 说明是组件
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
