// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
//
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
//
// 示例 1：
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出：3
// 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
//
// 示例 2：
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出：5
// 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
//
// 示例 3：
// 输入：root = [1,2], p = 1, q = 2
// 输出：1
//
//
// 提示：
//
// 树中节点数目在范围 [2, 105] 内。
// -109 <= Node.val <= 109
// 所有 Node.val 互不相同 。
// p != q
// p 和 q 均存在于给定的二叉树中。
import { describe, expect, test } from "vitest";
import { TreeNode, arrayToTree } from "./helper";

const implementType: "pathRecursive" | "nodeRecursive" = "nodeRecursive";

function lowestCommonAncestorPath(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (root == null || q == null || p == null) return null;
  let pPath: TreeNode[] = [];
  let qPath: TreeNode[] = [];
  const traverse = (node: TreeNode | null, path: TreeNode[] = []) => {
    if (node == null) return;
    if (node.val === p.val) {
      pPath = [...path, node];
    }
    if (node.val === q.val) {
      qPath = [...path, node];
    }
    if (node.left != null) {
      path.push(node);
      traverse(node.left, path);
      path.pop();
    }
    if (node.right != null) {
      path.push(node);
      traverse(node.right, path);
      path.pop();
    }
  };

  traverse(root);
  const minLength = Math.min(pPath.length, qPath.length);
  let pre: TreeNode | null = null;
  for (let i = 0; i < minLength; i++) {
    if (pPath[i] !== qPath[i]) {
      return pre;
    } else {
      pre = pPath[i];
    }
  }

  return pre;
}
function lowestCommonAncestorNode(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (root == null) return null;
  if (root === p || root === q) return root;
  const left = lowestCommonAncestorNode(root.left, p, q);
  const right = lowestCommonAncestorNode(root.right, p, q);
  // 两侧找到 p | q, 说明 root 就是要找的节点
  if (left != null && right != null) return root;
  // 右侧找到指定节点,返回右侧
  if (left == null && right != null) return right;
  // 左侧找到指定节点,返回左侧
  if (left != null && right == null) return left;
  return null;
}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  switch (implementType) {
    case "pathRecursive":
      return lowestCommonAncestorPath(root, p, q);
    case "nodeRecursive":
      return lowestCommonAncestorNode(root, p, q);
  }
}

describe("lowestCommonAncestor", () => {
  function findNode(node: TreeNode | null, val: number): TreeNode | null {
    if (!node) return null;
    if (node.val === val) return node;
    return findNode(node.left, val) || findNode(node.right, val);
  }

  test("示例 1: 最近公共祖先为根节点", () => {
    // 构建树 [3,5,1,6,2,0,8,null,null,7,4]
    const root = arrayToTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    // 查找 p=5, q=1
    const p = findNode(root, 5);
    const q = findNode(root, 1);
    const lca = lowestCommonAncestor(root, p, q);
    expect(lca?.val).toBe(3);
  });

  test("示例 2: 最近公共祖先为其中一个节点本身", () => {
    const root = arrayToTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    const p = findNode(root, 5);
    const q = findNode(root, 4);
    const lca = lowestCommonAncestor(root, p, q);
    expect(lca?.val).toBe(5);
  });

  test("示例 3: 只有两个节点的树", () => {
    const root = arrayToTree([1, 2]);
    const p = findNode(root, 1);
    const q = findNode(root, 2);
    const lca = lowestCommonAncestor(root, p, q);
    expect(lca?.val).toBe(1);
  });
});
