// 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
//
// 叶子节点 是指没有子节点的节点。
//
// 示例 1：
//
// 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// 输出：[[5,4,11,2],[5,8,4,5]]
//
// 示例 2：
//
// 输入：root = [1,2,3], targetSum = 5
// 输出：[]
//
// 示例 3：
//
// 输入：root = [1,2], targetSum = 0
// 输出：[]
//
//
//
// 提示：
//
//     树中节点总数在范围 [0, 5000] 内
//     -1000 <= Node.val <= 1000
//     -1000 <= targetSum <= 1000

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const paths: Array<number[]> = []
  if (root == null) return paths;
  const traverse = (node: TreeNode, sum: number, path: number[] = []) => {
    if (node.left == null && node.right == null && sum === targetSum) {
      paths.push([...path, node.val]);
      return;
    }
    if (node.left == null && node.right == null) {
      return;
    }
    if (node.left != null) {
      traverse(node.left, sum + node.left.val, [...path, node.val])
    }
    if (node.right != null) {
      traverse(node.right, sum + node.right.val, [...path, node.val])
    }
  }
  traverse(root, root.val);
  return paths;
}

import { describe, expect, test, vi } from "vitest";
import { TreeNode, arrayToTree } from "./helper";

describe("Path sum ii", () => {
  test("case 1", () => {
    // 示例1：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
    const root = arrayToTree([
      5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1
    ]);
    expect(pathSum(root, 22)).toEqual([
      [5, 4, 11, 2],
      [5, 8, 4, 5]
    ]);
  });

  test("case 2", () => {
    // 示例2：root = [1,2,3], targetSum = 5
    const root = arrayToTree([1, 2, 3]);
    expect(pathSum(root, 5)).toEqual([]);
  });

  test("case 3", () => {
    // 示例3：root = [1,2], targetSum = 0
    const root = arrayToTree([1, 2]);
    expect(pathSum(root, 0)).toEqual([]);
  });
});
