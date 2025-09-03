// 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
//
// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
//
//
// 示例 1：
//
// 输入：p = [1,2,3], q = [1,2,3]
// 输出：true
//
// 示例 2：
//
// 输入：p = [1,2], q = [1,null,2]
// 输出：false
// 示例 3：
//
// 输入：p = [1,2,1], q = [1,1,2]
// 输出：false
//
// 提示：
//
// 两棵树上的节点数目都在范围 [0, 100] 内
// -104 <= Node.val <= 104

import { describe, expect, test } from "vitest";
import { arrayToTree, TreeNode } from "./helper";

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p == null && q != null) return false;
  else if (p != null && q == null) return false;
  else if (p == null && q == null) return true;
  else if (p?.val !== q?.val) return false;

  return isSameTree(p!.left, q!.left) && isSameTree(p!.right, q!.right);
}

describe("Same tree", () => {
  test("case 1", () => {
    // 示例1：p = [1,2,3], q = [1,2,3]，输出 true
    const p = arrayToTree([1, 2, 3]);
    const q = arrayToTree([1, 2, 3]);
    expect(isSameTree(p, q)).toBe(true);
  });

  test("case 2", () => {
    // 示例2：p = [1,2], q = [1,null,2]，输出 false
    const p = arrayToTree([1, 2]);
    const q = arrayToTree([1, null, 2]);
    expect(isSameTree(p, q)).toBe(false);
  });

  test("case 3", () => {
    // 示例3：p = [1,2,1], q = [1,1,2]，输出 false
    const p = arrayToTree([1, 2, 1]);
    const q = arrayToTree([1, 1, 2]);
    expect(isSameTree(p, q)).toBe(false);
  });
});
