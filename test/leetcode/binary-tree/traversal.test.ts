import {
  BinaryTreeNode,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  levelOrderTraversal,
} from "./helper";

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Traversal in Binary Tree", () => {
  let binaryTree;
  beforeEach(() => {
    binaryTree = new BinaryTreeNode(
      8,
      new BinaryTreeNode(
        4,
        new BinaryTreeNode(2, new BinaryTreeNode(1), new BinaryTreeNode(3)),
        new BinaryTreeNode(6, new BinaryTreeNode(5), new BinaryTreeNode(7)),
      ),
      new BinaryTreeNode(
        12,
        new BinaryTreeNode(10, new BinaryTreeNode(9), new BinaryTreeNode(11)),
        new BinaryTreeNode(14, new BinaryTreeNode(13), new BinaryTreeNode(15)),
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
