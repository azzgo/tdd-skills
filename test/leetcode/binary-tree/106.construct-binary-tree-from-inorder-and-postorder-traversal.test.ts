// 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
//
// 示例 1:
//
// 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// 输出：[3,9,20,null,null,15,7]
//
// 示例 2:
//
// 输入：inorder = [-1], postorder = [-1]
// 输出：[-1]
//
// 提示:
//
//     1 <= inorder.length <= 3000
//     postorder.length == inorder.length
//     -3000 <= inorder[i], postorder[i] <= 3000
//     inorder 和 postorder 都由 不同 的值组成
//     postorder 中每一个值都在 inorder 中
//     inorder 保证是树的中序遍历
//     postorder 保证是树的后序遍历

import { treeToArray, TreeNode } from "./helper";

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  if (postorder.length === 0) return null;
  const inval = postorder[postorder.length - 1];
  const leftInValIndex = inorder.indexOf(inval);
  const leftInorder = inorder.slice(0, leftInValIndex);
  const rightInorder = inorder.slice(leftInValIndex + 1);

  // 关键点，中序和后续的左右序列长度应该相同
  const leftPostorder = postorder.slice(0, leftInValIndex);
  const rightPostorder = postorder.slice(leftInValIndex, -1);

  const node = new TreeNode(inval);

  node.left = buildTree(leftInorder, leftPostorder);
  node.right = buildTree(rightInorder, rightPostorder);
  return node;
}

import { describe, expect, test } from "vitest";

describe("construct binary tree from inorder and postorder traversal", () => {
  test("case 1", () => {
    const inorder = [9, 3, 15, 20, 7];
    const postorder = [9, 15, 7, 20, 3];
    expect(treeToArray(buildTree(inorder, postorder))).toEqual([
      3,
      9,
      20,
      null,
      null,
      15,
      7,
    ]);
  });
  test("case 2", () => {
    const inorder = [-1];
    const postorder = [-1];
    expect(treeToArray(buildTree(inorder, postorder))).toEqual([-1]);
  });
});
