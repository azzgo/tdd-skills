// 105. 从前序与中序遍历序列构造二叉树
// 已解答
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
//
//
//
// 示例 1:
//
//
// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// 输出: [3,9,20,null,null,15,7]
// 示例 2:
//
// 输入: preorder = [-1], inorder = [-1]
// 输出: [-1]
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0) return null;
  const inVal = preorder[0];
  const inValOfInOrder = inorder.indexOf(inVal);
  const leftInOrderPart = inorder.slice(0, inValOfInOrder);
  const rightInOrderPart = inorder.slice(inValOfInOrder + 1);

  // 关键点: 切分后,中序和前序的遍历长度(aka 次数)应一致
  const leftPreOrder = preorder.slice(1, 1 + leftInOrderPart.length);
  const rightPreOrderPart = preorder.slice(1 + leftPreOrder.length);

  const node = new TreeNode(inVal);
  node.left = buildTree(leftPreOrder, leftInOrderPart);
  node.right = buildTree(rightPreOrderPart, rightInOrderPart);

  return node;
}

import { describe, expect, test } from "vitest";
import { TreeNode, treeToArray } from "./helper";

describe("105. 从前序与中序遍历序列构造二叉树", () => {
  test("示例1：preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]，应返回 [3,9,20,null,null,15,7]", () => {
    const preorder = [3, 9, 20, 15, 7];
    const inorder = [9, 3, 15, 20, 7];
    const root = buildTree(preorder, inorder);
    expect(treeToArray(root)).toEqual([3, 9, 20, null, null, 15, 7]);
  });

  test("示例2：preorder = [-1], inorder = [-1]，应返回 [-1]", () => {
    const preorder = [-1];
    const inorder = [-1];
    const root = buildTree(preorder, inorder);
    expect(treeToArray(root)).toEqual([-1]);
  });
});
