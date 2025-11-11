// 199. 二叉树的右视图
// 已解答
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
//
//
//
// 示例 1：
//
// 输入：root = [1,2,3,null,5,null,4]
//
// 输出：[1,3,4]
//
// 解释：
//
//
//
// 示例 2：
//
// 输入：root = [1,2,3,4,null,null,null,5]
//
// 输出：[1,3,4,5]
//
// 解释：
//
//
//
// 示例 3：
//
// 输入：root = [1,null,3]
//
// 输出：[1,3]
//
// 示例 4：
//
// 输入：root = []
//
// 输出：[]
//
//
//
// 提示:
//
// 二叉树的节点个数的范围是 [0,100]
// -100 <= Node.val <= 100
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

import { TreeNode } from "./helper";
import { describe, expect, test } from "vitest";

function rightSideView(root: TreeNode | null): number[] {
  let current;
  const queue = [root];
  const result: number[] = [];

  while (queue.length) {
    const layerSize = queue.length;
    for (let i = 0; i < layerSize; i++) {
      current = queue.shift();
      if (i === layerSize -1 && current) {
        result.push(current.val);
      }
      if (current?.left) {
        queue.push(current.left)
      }
      if (current?.right) {
        queue.push(current.right)
      }
      
    }
  }

  return result;
}

describe("binary right tree view", () => {
  test("示例1：常规树结构", () => {
    // 输入：root = [1,2,3,null,5,null,4]
    //    1
    //   / \
    //  2   3
    //   \    \
    //    5    4
    const root = new TreeNode(
      1,
      new TreeNode(2, null, new TreeNode(5)),
      new TreeNode(3, null, new TreeNode(4)),
    );
    expect(rightSideView(root)).toEqual([1, 3, 4]);
  });

  test("示例2：左子树有深度", () => {
    // 输入：root = [1,2,3,4,null,null,null,5]
    //      1
    //     / \
    //    2   3
    //   /
    //  4
    // /
    //5
    const root = new TreeNode(
      1,
      new TreeNode(2, new TreeNode(4, new TreeNode(5))),
      new TreeNode(3),
    );
    expect(rightSideView(root)).toEqual([1, 3, 4, 5]);
  });

  test("示例3：只有右子树", () => {
    // 输入：root = [1,null,3]
    // 1
    //  \
    //   3
    const root = new TreeNode(1, null, new TreeNode(3));
    expect(rightSideView(root)).toEqual([1, 3]);
  });

  test("示例4：空树", () => {
    // 输入：root = []
    expect(rightSideView(null)).toEqual([]);
  });

  test("单节点树", () => {
    const root = new TreeNode(42);
    expect(rightSideView(root)).toEqual([42]);
  });

  test("完全二叉树", () => {
    //      1
    //     / \
    //    2   3
    //   / \ / \
    //  4  5 6  7
    const root = new TreeNode(
      1,
      new TreeNode(2, new TreeNode(4), new TreeNode(5)),
      new TreeNode(3, new TreeNode(6), new TreeNode(7)),
    );
    expect(rightSideView(root)).toEqual([1, 3, 7]);
  });
});
