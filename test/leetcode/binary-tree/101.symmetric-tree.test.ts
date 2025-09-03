// 给你一个二叉树的根节点 root ， 检查它是否轴对称。
//
// 示例 1：
// 输入：root = [1,2,2,3,4,4,3]
// 输出：true
// 示例 2：
// 输入：root = [1,2,2,null,3,null,3]
// 输出：false
//
// 提示：
//
// 树中节点数目在范围 [1, 1000] 内
// -100 <= Node.val <= 100
//
// 进阶：你可以运用递归和迭代两种方法解决这个问题吗？

import { arrayToTree, TreeNode } from "./helper";

const solutionType: "iterative" | "recursive" = "iterative";

function isSymmetricRecusive(root: TreeNode | null): boolean {
  if (root == null) return true;
  const compare = (left: TreeNode | null, right: TreeNode | null): boolean => {
    if (left == null && right != null) {
      return false;
    } else if (left != null && right == null) {
      return false;
    } else if (left == null && right == null) {
      return true;
    } else if (left?.val !== right?.val) {
      return false;
    }

    const outside = compare(left!.left, right!.right);
    const inside = compare(left!.right, right!.left);
    return outside && inside;
  };

  return compare(root.left, root.right);
}

function isSymmetricIterative(root: TreeNode | null): boolean {
  if (root == null) return true;
  const stack = [];
  stack.push(root.left, root.right);
  while (stack.length) {
    const right = stack.pop();
    const left = stack.pop();
    if (left == null && right != null) return false;
    else if (left != null && right == null) return false;
    else if (left == null && right == null) continue;
    else if (left?.val !== right?.val) return false;

    stack.push(left!.left, right!.right, left!.right, right!.left);
  }
  return true;
}

function isSymmetric(root: TreeNode | null): boolean {
  switch (solutionType) {
    case "iterative":
      return isSymmetricIterative(root);
    case "recursive":
      return isSymmetricRecusive(root);
  }
}

import { beforeEach, describe, expect, test } from "vitest";

describe("Invert binary tree", () => {
  beforeEach(() => {});

  test("test case 1", () => {
    expect(isSymmetric(arrayToTree([1, 2, 2, 3, 4, 4, 3]))).toBeTruthy();
  });

  test("test case 2", () => {
    expect(isSymmetric(arrayToTree([1, 2, 2, null, 3, null, 3]))).toBeFalsy();
  });
});
