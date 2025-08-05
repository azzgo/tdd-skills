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
  patchProps: (el, key, prevValue, nextValue) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const shouldSetAsProp = (el, key, value) => {
      // for property that is readonly, should not set dom property, this is only one case here
      if (key === "form" && el.tagName === "INPUT") return false;
      return key in el;
    };
    if (shouldSetAsProp(el, key, nextValue)) {
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
    const el = createElement(vnode.type);
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
  /**
   * @param {Object} n1 - The old virtual node.
   * @param {Object} n2 - The new virtual node.
   * @param {HTMLElement} container - The container to render into.
   **/
  const patch = (n1, n2, container) => {
    if (!n1) {
      mountElement(n2, container);
    } else {
      // TODO: n1 exists, update logic here
    }
  };
  const render = (vnode, container) => {
    // structure here
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        container.innerHTML = "";
      }
    }
    container._vnode = vnode;
  };
  return {
    render,
  };
};
