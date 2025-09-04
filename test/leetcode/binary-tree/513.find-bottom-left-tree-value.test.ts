// 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。
//
// 假设二叉树中至少有一个节点。
//
//
//
// 示例 1:
//
// 输入: root = [2,1,3]
// 输出: 1
//
// 示例 2:
//
// 输入: [1,2,3,4,null,5,6,null,null,7]

import { arrayToTree, TreeNode } from "./helper";

function findBottomLeftValue(root: TreeNode | null): number {
  let maxDepth = 0;
  let result: number = 0;
  if (root == null) return 0;
  const traverse = (node: TreeNode, depth: number) => {
    if (node.left == null && node.right == null) {
      if (depth > maxDepth) {
        maxDepth = depth;
        result = node.val;
      }
      return;
    }
    if (node.left != null) traverse(node.left, depth + 1);
    if (node.right != null) traverse(node.right, depth + 1);
  };

  traverse(root, 1);
  return result;
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("find-bottom-left-tree-value", () => {
  test("case 1", () => {
    const root = arrayToTree([2, 1, 3]);
    expect(findBottomLeftValue(root)).toEqual(1);
  });
  test("case 2", () => {
    const root = arrayToTree([1, 2, 3, 4, null, 5, 6, null, null, 7]);
    expect(findBottomLeftValue(root)).toEqual(7);
  });
});
