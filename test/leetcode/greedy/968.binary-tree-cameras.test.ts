// 给定一个二叉树，我们在树的节点上安装摄像头。
//
// 节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。
//
// 计算监控树的所有节点所需的最小摄像头数量。
//
// 示例 1：
//
// 输入：[0,0,null,0,0]
// 输出：1
// 解释：如图所示，一台摄像头足以监控所有节点。
// 示例 2：
//
// 输入：[0,0,null,0,null,0,null,null,0]
// 输出：2
// 解释：需要至少两个摄像头来监视树的所有节点。 上图显示了摄像头放置的有效位置之一。
//
// 提示：
//
// 给定树的节点数的范围是 [1, 1000]。
// 每个节点的值都是 0。

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

enum NodeStatus {
  Camera,     // 0
  Cover,      // 1
  NoCover,    // 2
  None,       // 3
  Undefined,  // 4
}
function minCameraCover(root: TreeNode | null): number {
  let result = 0;
  if (root === null) return result;
  // 思路上要从叶子节点的父节点开始 2 个一组向上放监控
  const traverse = (node: TreeNode | null): NodeStatus => {
    if (node == null) return NodeStatus.None;
    const left = traverse(node.left);
    const right = traverse(node.right);


    // 左右都右监控覆盖或者左右是叶子节点,这个节点属于监控外
    if ([NodeStatus.Cover, NodeStatus.None].includes(left) && [NodeStatus.Cover, NodeStatus.None].includes(right)) {
      return NodeStatus.NoCover;
    }

    // 左右节点至少有一个无覆盖的情况
    if (left === NodeStatus.NoCover || right === NodeStatus.NoCover) {
      result++;
      return NodeStatus.Camera;
    }
    // 左右节点至少有一个有摄像头
    if (left === NodeStatus.Camera || right === NodeStatus.Camera) {
      return NodeStatus.Cover;
    }
    return NodeStatus.Undefined;
  };

  // 特殊情况,单节点,必须要放一个监控
  if (traverse(root) === NodeStatus.NoCover) {
    result++;
  }

  return result;
}

import { describe, expect, test } from "vitest";

describe("二叉树摄像头覆盖", () => {
  test("示例1：一台摄像头足以监控所有节点", () => {
    // 输入：[0,0,null,0,0]
    const root = arrayToTree([0, 0, null, 0, 0]);
    expect(minCameraCover(root)).toBe(1);
  });

  test("示例2：需要至少两个摄像头来监视所有节点", () => {
    // 输入：[0,0,null,0,null,0,null,null,0]
    const root = arrayToTree([0, 0, null, 0, null, 0, null, null, 0]);
    expect(minCameraCover(root)).toBe(2);
  });

  test("单节点树应只需一个摄像头", () => {
    const root = arrayToTree([0]);
    expect(minCameraCover(root)).toBe(1);
  });
});
