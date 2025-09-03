import {
  TreeNode,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  levelOrderTraversal,
} from "./helper";

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Traversal in Binary Tree", () => {
  let binaryTree;
  beforeEach(() => {
    binaryTree = new TreeNode(
      8,
      new TreeNode(
        4,
        new TreeNode(2, new TreeNode(1), new TreeNode(3)),
        new TreeNode(6, new TreeNode(5), new TreeNode(7)),
      ),
      new TreeNode(
        12,
        new TreeNode(10, new TreeNode(9), new TreeNode(11)),
        new TreeNode(14, new TreeNode(13), new TreeNode(15)),
      ),
    );
  });

  test("inorderTraversal", () => {
    const result: number[] = [];
    inorderTraversal(binaryTree, (node) => result.push(node.val));
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  test("preorderTraversal", () => {
    const result: number[] = [];
    preorderTraversal(binaryTree, (node) => result.push(node.val));
    expect(result).toEqual([8, 4, 2, 1, 3, 6, 5, 7, 12, 10, 9, 11, 14, 13, 15]);
  });

  test("postorderTraversal", () => {
    const result: number[] = [];
    postorderTraversal(binaryTree, (node) => result.push(node.val));
    expect(result).toEqual([1, 3, 2, 5, 7, 6, 4, 9, 11, 10, 13, 15, 14, 12, 8]);
  });

  test("levelOrderTraversal", () => {
    const result: number[] = [];
    levelOrderTraversal(binaryTree, (node) => result.push(node.val));
    expect(result).toEqual([8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15]);
  });
});
