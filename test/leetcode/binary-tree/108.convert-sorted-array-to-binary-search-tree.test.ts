// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。
//
// 示例 1：
// 输入：nums = [-10,-3,0,5,9]
// 输出：[0,-3,9,-10,null,5]
// 解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：
//
// 示例 2：
// 输入：nums = [1,3]
// 输出：[3,1]
// 解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。
import { describe, expect, test } from "vitest";
import { TreeNode, treeToArray } from "./helper";
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  const rootIndex = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[rootIndex]);
  root.left = sortedArrayToBST(nums.slice(0, rootIndex))
  root.right = sortedArrayToBST(nums.slice(rootIndex + 1))
  return root;
}

describe("build bst", () => {
  test("case 1", () => {
    expect(treeToArray(sortedArrayToBST([-10, -3, 0, 5, 9]))).toBeOneOf([
      [0, -3, 9, -10, null, 5],
      [0, -10, 5, null, -3, null, 9],
    ]);
  });
  test("case 2", () => {
    expect(treeToArray(sortedArrayToBST([1, 3]))).toBeOneOf([
      [3, 1],
      [1, null, 3],
    ]);
  });
});
