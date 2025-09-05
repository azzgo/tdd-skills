// 给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high。通过修剪二叉搜索树，使得所有节点的值在[low, high]中。修剪树 不应该 改变保留在树中的元素的相对结构 (即，如果没有被移除，原有的父代子代关系都应当保留)。 可以证明，存在 唯一的答案 。
//
// 所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变。
//
// 示例 1：
//
// 输入：root = [1,0,2], low = 1, high = 2
// 输出：[1,null,2]
//
// 示例 2：
//
// 输入：root = [3,0,4,null,2,null,null,1], low = 1, high = 3
// 输出：[3,2,null,1]
//  
//
// 提示：
//
// 树中节点数在范围 [1, 104] 内
// 0 <= Node.val <= 104
// 树中每个节点的值都是 唯一 的
// 题目数据保证输入是一棵有效的二叉搜索树
// 0 <= low <= high <= 104
import { describe, expect, test } from "vitest";
import { TreeNode, arrayToTree, treeToArray } from "./helper";

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (root == null) return null;
  if (root.val < low) {
    return trimBST(root.right, low, high)
  }
  if (root.val > high) {
    return trimBST(root.left, low, high);
  }
  root.left = trimBST(root.left, low, high)
  root.right = trimBST(root.right, low, high)
  return root;
};


describe("trimBST", () => {
  test("示例1：root = [1,0,2], low = 1, high = 2", () => {
    const root = arrayToTree([1,0,2]);
    const result = trimBST(root, 1, 2);
    expect(treeToArray(result)).toEqual([1,null,2]);
  });

  test("示例2：root = [3,0,4,null,2,null,null,1], low = 1, high = 3", () => {
    const root = arrayToTree([3,0,4,null,2,null,null,1]);
    const result = trimBST(root, 1, 3);
    expect(treeToArray(result)).toEqual([3,2,null,1]);
  });

  test("全部节点都在区间外", () => {
    const root = arrayToTree([2,1,3]);
    const result = trimBST(root, 4, 5);
    expect(treeToArray(result)).toEqual([]);
  });

  test("全部节点都在区间内", () => {
    const root = arrayToTree([2,1,3]);
    const result = trimBST(root, 1, 3);
    expect(treeToArray(result)).toEqual([2,1,3]);
  });
});
