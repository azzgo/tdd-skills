// 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
//
// 示例 1：
// 输入：root = [4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]
//
// 示例 2：
// 输入：root = [2,1,3]
// 输出：[2,3,1]
//
// 示例 3：
// 输入：root = []
// 输出：[]

import { TreeNode, arrayToTree, inorderTraversal, treeToArray } from "./helper";

function invertTree(root: TreeNode | null): TreeNode | null {
  inorderTraversal(root, (node) => {
    if (node) {
      [node.left, node.right] = [node.right, node.left]
    }
  })
  return root;
}

import { describe, expect, test } from "vitest";

describe("Invert Binary tree", () => {
  test("case 1", () => {
    const input = [4, 2, 7, 1, 3, 6, 9];
    const expected = [4, 7, 2, 9, 6, 3, 1];
    const root = arrayToTree(input);
    const inverted = invertTree(root);
    expect(treeToArray(inverted)).toEqual(expected);
  });
  test("case 2", () => {
    const input = [2, 1, 3];
    const expected = [2, 3, 1];
    const root = arrayToTree(input);
    const inverted = invertTree(root);
    expect(treeToArray(inverted)).toEqual(expected);
  });
  test("case 3", () => {
    const input: number[] = [];
    const expected: number[] = [];
    const root = arrayToTree(input);
    const inverted = invertTree(root);
    expect(treeToArray(inverted)).toEqual(expected);
  });
});
