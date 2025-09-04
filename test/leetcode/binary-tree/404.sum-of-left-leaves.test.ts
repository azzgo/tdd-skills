// 给定二叉树的根节点 root ，返回所有左叶子之和。
//
// 示例 1：
//
// 输入: root = [3,9,20,null,null,15,7]
// 输出: 24
// 解释: 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
//
// 示例 2:
//
// 输入: root = [1]
// 输出: 0
//
//
//
// 提示:
//
//     节点数在 [1, 1000] 范围内
//     -1000 <= Node.val <= 1000

import { TreeNode, arrayToTree } from "./helper";

function sumOfLeftLeaves(root: TreeNode | null): number {
  let sum = 0;
  if (root == null) return sum;
  if (root.left == null && root.right == null) return 0;
  if (
    root.left != null &&
    root.left.left == null &&
    root.left.right == null
  ) {
    sum += root.left.val;
  }
  if (root.left != null) sum +=sumOfLeftLeaves(root.left);
  if (root.right != null) sum+=sumOfLeftLeaves(root.right);
  return sum;
}

import { beforeEach, describe, expect, test } from "vitest";

describe("Sum of left leaves", () => {
  beforeEach(() => {});

  test("example 1: [3,9,20,null,null,15,7] -> 24", () => {
    const root = arrayToTree([3, 9, 20, null, null, 15, 7]);
    const result = sumOfLeftLeaves(root);
    expect(result).toBe(24);
  });

  test("example 2: [1] -> 0", () => {
    const root = arrayToTree([1]);
    const result = sumOfLeftLeaves(root);
    expect(result).toBe(0);
  });

  test("skewed left chain: [1,2,null,3] -> 3", () => {
    const root = arrayToTree([1, 2, null, 3]);
    const result = sumOfLeftLeaves(root);
    expect(result).toBe(3);
  });

  test("left child exists but is not a leaf -> 0", () => {
    const root = arrayToTree([1, 2, 3, null, 4]);
    const result = sumOfLeftLeaves(root);
    expect(result).toBe(0);
  });

  test("multiple left leaves in complete tree: [1,2,3,4,5,6,7] -> 10", () => {
    const root = arrayToTree([1, 2, 3, 4, 5, 6, 7]);
    const result = sumOfLeftLeaves(root);
    expect(result).toBe(4 + 6);
  });

  test("supports negative values: [-2,-3,-4] -> -3", () => {
    const root = arrayToTree([-2, -3, -4]);
    const result = sumOfLeftLeaves(root);
    expect(result).toBe(-3);
  });
});
