// 给定一个二叉树，判断它是否是
// 定义: 平衡二叉树 是指该树所有节点的左右子树的高度相差不超过 1。
//
// 示例 1：
//
// 输入：root = [3,9,20,null,null,15,7]
// 输出：true
//
// 示例 2：
//
// 输入：root = [1,2,2,3,3,null,null,4,4]
// 输出：false
//
// 示例 3：
//
// 输入：root = []
// 输出：true

import {TreeNode, arrayToTree} from "./helper";

function isBalanced(root: TreeNode | null): boolean {
  if (root === null) return true;
  const getHeight = (node: TreeNode | null): number => {
    if (node == null) return 0;
    const leftHeight = getHeight(node.left)
    const rightHeight = getHeight(node.right)
    if (leftHeight === -1) return -1;
    if (rightHeight === -1) return -1;
    return Math.abs(leftHeight - rightHeight) > 1 ? -1 : Math.max(leftHeight, rightHeight) +1
  }
  return getHeight(root) !== -1;
};

import { beforeEach, describe, expect, test } from "vitest";

describe("Balanced binnary treu", () => {
  beforeEach(() => {
  });

  test("case 1", () => {
    // 示例 1：root = [3,9,20,null,null,15,7]，输出 true
    const root = arrayToTree([3,9,20,null,null,15,7]);
    expect(isBalanced(root)).toBe(true);
  });

  test("case 2", () => {
    // 示例 2：root = [1,2,2,3,3,null,null,4,4]，输出 false
    const root = arrayToTree([1,2,2,3,3,null,null,4,4]);
    expect(isBalanced(root)).toBe(false);
  });

  test("case 3", () => {
    // 示例 3：root = []，输出 true
    const root = arrayToTree([]);
    expect(isBalanced(root)).toBe(true);
  });

  test('case 4', () => {
    const root = arrayToTree([1,2,2,3,null,null,3,4,null,null,4]);
    expect(isBalanced(root)).toBe(false);
  });
});
