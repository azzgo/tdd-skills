// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
//
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
//
// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
//
// 示例 1:
//
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// 输出: 6
// 解释: 节点 2 和节点 8 的最近公共祖先是 6。
// 示例 2:
//
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// 输出: 2
// 解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
//
//
// 说明:
//
// 所有节点的值都是唯一的。

import { TreeNode, arrayToTree } from "./helper";
import { describe, expect, test } from "vitest";

// p、q 为不同节点且均存在于给定的二叉搜索树中。
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (root == null || p == null || q == null) return null;
  const min = Math.min(p.val, q.val);
  const max = Math.max(p.val, q.val);
  if (root.val >= min && root.val <= max) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  return left || right;
}

describe("bst common ancestor", () => {
  test("示例1: p=2, q=8, 最近公共祖先为6", () => {
    const root = arrayToTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
    const p = root?.left; // 节点2
    const q = root?.right; // 节点8
    const ancestor = lowestCommonAncestor(root, p, q);
    expect(ancestor?.val).toBe(6);
  });

  test("示例2: p=2, q=4, 最近公共祖先为2", () => {
    const root = arrayToTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
    const p = root?.left; // 节点2
    const q = root?.left?.right; // 节点4
    const ancestor = lowestCommonAncestor(root, p, q);
    expect(ancestor?.val).toBe(2);
  });

  test("边界: p和q为同一节点", () => {
    const root = arrayToTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
    const p = root; // 节点6
    const q = root; // 节点6
    const ancestor = lowestCommonAncestor(root, p, q);
    expect(ancestor?.val).toBe(6);
  });
});
