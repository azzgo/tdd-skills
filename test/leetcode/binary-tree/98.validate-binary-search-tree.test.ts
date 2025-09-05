// 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
//
// 有效 二叉搜索树定义如下：
//
// 节点的左子树只包含 严格小于 当前节点的数。
// 节点的右子树只包含 严格大于 当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。
//
//
// 示例 1：
//
//
// 输入：root = [2,1,3]
// 输出：true
// 示例 2：
//
//
// 输入：root = [5,1,4,null,null,3,6]
// 输出：false
// 解释：根节点的值是 5 ，但是右子节点的值是 4 。
import { describe, expect, test } from "vitest";
import { TreeNode, arrayToTree } from "./helper";

/**
  * 利用二叉搜索树中序遍历升序的特点,只要违反这个特性,就不是二叉搜索树
  **/
function isValidBST(root: TreeNode | null): boolean {
  // 用来存储中序前一个节点的值,判断是否升序
  let pre: TreeNode | null = null;
  const valid = (node: TreeNode | null): boolean => {
    if (node == null) return true;
    const leftValid = valid(node.left);
    if (pre != null && pre.val >= node.val) return false;
    pre = node;
    const rightValid = valid(node.right);
    return leftValid && rightValid;
  };
  return valid(root);
}

describe("name", () => {
  test("case 1", () => {
    expect(isValidBST(arrayToTree([2, 1, 3]))).toBeTruthy();
  });
  test("case 2", () => {
    expect(isValidBST(arrayToTree([5, 1, 4, null, null, 3, 6]))).toBeFalsy();
  });
  test("case3", () => {
    expect(isValidBST(arrayToTree([2, 2, 2]))).toBeFalsy();
  });
  test("case4", () => {
    expect(isValidBST(arrayToTree([0, -1]))).toBeTruthy();
  });

  test("case5", () => {
    expect(isValidBST(arrayToTree([5, 4, 6, null, null, 3, 7]))).toBeFalsy();
  });
});
