/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { listToSequence } from "./utils";

const Text = Symbol();
const Fragment = Symbol();

const rendererOptions = {
  createElement: (type) => {
    return document.createElement(type);
  },
  insert: (el, parent, anchor = null) => {
    if (anchor) {
      parent.insertBefore(el, anchor);
    } else {
      parent.appendChild(el);
    }
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
  const mountElement = (vnode, container, anchor) => {
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
    insert(el, container, anchor);
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

  const patchChildren = (n1, n2, container) => {
    if (typeof n2.children === "string") {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c));
      }
      setElementText(container, n2.children);
    } else if (Array.isArray(n2.children)) {
      if (Array.isArray(n1.children)) {
        quickDiffAlgorithm(n1, n2, container);
        // doubleEndDiffAlgorithm(n1, n2, container);
        // simpleDiffAlgorithm(n1, n2, container)
      } else {
        setElementText(container, "");
        n2.children.forEach((c) => patch(null, c, container));
      }
    } else {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c));
      } else if (typeof n1.children === "string") {
        setElementText(container, "");
      }
    }

    function simpleDiffAlgorithm(n1, n2, container) {
      const oldChildren = n1.children;
      const newChildren = n2.children;
      let lastMaxIndex = 0;
      for (let i = 0; i < newChildren.length; i++) {
        const newNode = newChildren[i];
        let found = false;
        for (let j = 0; j < oldChildren.length; j++) {
          const oldNode = oldChildren[j];
          if (newNode.key === oldNode.key) {
            found = true;
            patch(oldNode, newNode, container);
            if (j < lastMaxIndex) {
              const prevNode = newChildren[i - 1];
              if (prevNode) {
                const anchor = (prevNode.el as HTMLElement).nextSibling;
                insert(newNode.el, container, anchor);
              }
            } else {
              lastMaxIndex = j;
            }
            // 已经找到匹配 key，跳出内层循环
            break;
          }
        }
        // 说明是新增节点, 这里移动和新增判断在一个循环中，避免多余的循环逻辑
        if (!found) {
          const prevNode = newChildren[i - 1];
          let anchor = null;
          if (prevNode) {
            anchor = (prevNode.el as HTMLElement).nextSibling;
          } else {
            anchor = container.firstChild;
          }
          patch(null, newNode, container, anchor);
        }
      }
      // 处理移除的节点逻辑, 这里不能复用之前的循环，必须通过旧列表找新列表
      for (let i = 0; i < oldChildren.length; i++) {
        const oldNode = oldChildren[i];
        const has = newChildren.find((vnode) => vnode.key === oldNode.key);
        if (!has) {
          unmount(oldNode);
        }
      }
    }

    function doubleEndDiffAlgorithm(n1, n2, container) {
      const oldChildren = n1.children;
      const newChildren = n2.children;
      let oldStartIdx = 0,
        oldEndIdx = oldChildren.length - 1,
        newStartIdx = 0,
        newEndIdx = newChildren.length - 1;
      let oldStartNode = oldChildren[oldStartIdx],
        oldEndNode = oldChildren[oldEndIdx],
        newStartNode = newChildren[newStartIdx],
        newEndNode = newChildren[newEndIdx];
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (!oldStartNode) {
          // 跳过标记已处理的节点
          oldStartNode = oldChildren[++oldStartIdx];
        } else if (!oldEndNode) {
          // 跳过标记已处理的节点
          oldEndNode = oldChildren[--oldEndIdx];
        } else if (oldStartNode.key === newStartNode.key) {
          // 先更新对应节点
          patch(oldStartNode, newStartNode, container);
          // 都在开头，不需要移动
          oldStartNode = oldChildren[++oldStartIdx];
          newStartNode = newChildren[++newStartIdx];
        } else if (oldEndNode.key === newEndNode.key) {
          // 先更新对应节点
          patch(oldEndNode, newEndNode);
          // 都在结尾，不需要移动
          oldEndNode = oldChildren[--oldEndIdx];
          newEndNode = newChildren[--newEndIdx];
        } else if (oldStartNode.key === newEndNode.key) {
          patch(oldStartNode, newEndNode, container);
          // 将节点插入最后
          insert(oldStartNode.el, container, oldEndNode.el.nextSibling);
          oldStartNode = oldChildren[++oldStartIdx];
          newEndNode = newChildren[--newEndIdx];
        } else if (oldEndNode.key === newStartNode.key) {
          // 先更新对应节点
          patch(oldEndNode, newStartNode, container);
          // 将节点插入最开始的位置
          insert(oldEndNode.el, container, oldStartNode.el);
          oldEndNode = oldChildren[--oldEndIdx];
          newStartNode = newChildren[++newStartIdx];
        } else {
          // 处理非理想情况
          const idxInOld = oldChildren.findIndex(
            // ?. 是因为会使用 undefined 做处理标记
            (vnode) => vnode?.key === newStartNode.key,
          );
          if (idxInOld > 0) {
            const vnodeToMove = oldChildren[idxInOld];
            patch(vnodeToMove, newStartNode, container);
            insert(vnodeToMove.el, container, oldStartNode.el);
            // 标记，表明处理过这个节点，后面循环需要跳过这个节点位置
            oldChildren[idxInOld] = undefined;
          } else {
            // 说明是新增元素，创建元素，并挂在在指针的开头
            patch(null, newStartNode, container, oldStartNode.el);
          }
          newStartNode = newChildren[++newStartIdx];
        }
      }

      // 说明剩余未遍历元素是新增元素
      if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
        for (let i = newStartIdx; i <= newEndIdx; i++) {
          patch(null, newChildren[i], container, oldStartNode.el);
        }
      } // 说明剩余未遍历元素是移除元素
      else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          if (oldChildren[i]) {
            unmount(oldChildren[i]);
          }
        }
      }
    }

    function quickDiffAlgorithm(n1, n2, container) {
      const oldChildren = n1.children;
      const newChildren = n2.children;
      let j = 0;
      let oldStartNode = oldChildren[j];
      let newStartNode = newChildren[j];
      let newEndIdx = newChildren.length - 1;
      let oldEndIdx = oldChildren.length - 1;
      let newEndNode = newChildren[newEndIdx];
      let oldEndNode = oldChildren[oldEndIdx];
      while (oldStartNode.key === newStartNode.key) {
        patch(oldStartNode, newStartNode, container);
        j++;
        oldStartNode = oldChildren[j];
        newStartNode = newChildren[j];
      }

      while (oldEndNode.key === newEndNode.key) {
        patch(oldEndNode, newEndNode, container);
        oldEndIdx--;
        newEndIdx--;
        oldEndNode = oldChildren[oldEndIdx];
        newEndNode = newChildren[newEndIdx];
      }

      // 仅新列表存在未处理节点
      if (j <= newEndIdx && j > oldEndIdx) {
        const anchorIndex = newEndIdx + 1;
        const anchor =
          anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
        while (j <= newEndIdx) {
          patch(null, newChildren[j++], container, anchor);
        }
        // 仅旧列表存在未处理节点
      } else if (j <= oldEndIdx && j > newEndIdx) {
        for (let i = j; i <= oldEndIdx; i++) {
          unmount(oldChildren[i]);
        }
      } else {
        // 相同前后置元素压缩后，新旧列表仍均存在未处理节点
        const count = newEndIdx - j + 1;
        const source = new Array(count).fill(-1);
        const oldStartIndex = j;
        const newStartIndex = j;
        const keyIndex = {};
        for (let i = newStartIndex; i <= newEndIdx; i++) {
          const key = newChildren[i].key;
          keyIndex[key] = i;
        }
        let moved = false;
        let pos = 0;
        let patched = 0;
        for (let i = oldStartIndex; i <= oldEndIdx; i++) {
          const oldNode = oldChildren[i];
          if (patched <= count) {
            const k = keyIndex[oldNode.key];
            if (k == null) {
              unmount(oldNode);
            } else {
              patch(oldNode, newChildren[k], container);
              patched++;
              // 构建 source 数组，用来寻找最长递增子序列
              source[k - newStartIndex] = i;
              // 判断是否有节点移动
              if (k < pos) {
                moved = true;
              } else {
                pos = k;
              }
            }
          } else {
            unmount(oldNode);
          }
        }
        const seq = listToSequence(source);
        let s = seq.length - 1;
        let i = count - 1;
        for (; i >= 0; i--) {
          if (source[i] === -1) {
            const pos = i + newStartIndex;
            const newNode = newChildren[pos];
            const anchor =
              pos + 1 < newChildren.length ? newChildren[pos + 1].el : null;
            patch(null, newNode, container, anchor);
          } else if (moved && i !== seq[s]) {
            // 说明不在最长递增子序列中，需要移动, 不过这里通过 moved 标记来判断是否需要移动,减少判断逻辑
            const pos = i + newStartIndex;
            const newNode = newChildren[pos];
            const anchor =
              pos + 1 < newChildren.length ? newChildren[pos + 1].el : null;
            insert(newNode.el, container, anchor);
          } else {
            // 说明在最长递增子序列中，不需要移动
            s--;
          }
        }
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
   * @param {HTMLElement | null} anchor
   **/
  const patch = (n1, n2, container, anchor = null) => {
    if (n1 && n1.type !== n2.type) {
      unmount(n1);
      n1 = null;
    }
    switch (typeof n2.type) {
      // string 说明是普通 HTML 标签
      case "string":
        if (!n1) {
          mountElement(n2, container, anchor);
        } else {
          patchElement(n1, n2);
        }
        break;
      case Text:
        if (!n1) {
          const el = (n2.el = createText(n2.children));
          insert(el, container);
        } else {
          const el = (n2.el = n1.el);
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
