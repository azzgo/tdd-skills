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
};

export const createRenderer = ({
  createElement,
  insert,
  setElementText,
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
