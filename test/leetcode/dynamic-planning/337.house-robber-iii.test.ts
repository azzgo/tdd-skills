// 小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。
//
// 除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。
//
// 给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
//
//
// 示例 1:
//
// 输入: root = [3,2,3,null,3,null,1]
// 输出: 7
// 解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7
//
// 示例 2:
//
// 输入: root = [3,4,5,1,3,null,1]
// 输出: 9
// 解释: 小偷一晚能够盗取的最高金额 4 + 5 = 9
//
//
//
// 提示：
//
//     树的节点数在 [1, 104] 范围内
//     0 <= Node.val <= 104

import { TreeNode, arrayToTree } from "../binary-tree/helper";

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

function rob(root: TreeNode | null): number {
  // dp 定义: dp 为长度为 2 的数组, 0 -> 表明是不取当前节点的最大偷取金额， 1-> 取当前节点的最大偷取金额
  // 注意左右子树不算相邻
  const traverse = (node: TreeNode | null): [number, number] => {
    if (node == null) return [0, 0];

    const left = traverse(node.left);
    const right = traverse(node.right);

    // 状态转移方程，按分别求取不取当前节点，或取当前节点的最大偷取金额
    // 不取当前节点, 那么当前的 val 不能算入偷取金额中
    // 左右子树要取最大能偷取的金额作为当前 dp 的返回值
    const val1 = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    // 取当前节点
    // 当前取值，按相邻远，子树一定不取
    const val2 = node.val + left[0] + right[0];
    return [val1, val2];
  };

  const result = traverse(root);
  return Math.max(...result);
}

import { describe, expect, test } from "vitest";

describe("337. 打家劫舍 III", () => {
  test("示例 1: [3,2,3,null,3,null,1] 应该返回 7", () => {
    const root = arrayToTree([3, 2, 3, null, 3, null, 1]);
    expect(rob(root)).toBe(7);
  });

  test("示例 2: [3,4,5,1,3,null,1] 应该返回 9", () => {
    const root = arrayToTree([3, 4, 5, 1, 3, null, 1]);
    expect(rob(root)).toBe(9);
  });

  test("空树应该返回 0", () => {
    expect(rob(null)).toBe(0);
  });

  test("单节点树应该返回节点值", () => {
    const root = arrayToTree([5]);
    expect(rob(root)).toBe(5);
  });

  test("复杂二叉树测试", () => {
    const root = arrayToTree([4, 1, null, 2, null, 3]);
    expect(rob(root)).toBe(7);
  });
});
