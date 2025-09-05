// 给你一个含重复值的二叉搜索树（BST）的根节点 root ，找出并返回 BST 中的所有 众数（即，出现频率最高的元素）。
//
// 如果树中有不止一个众数，可以按 任意顺序 返回。
//
// 假定 BST 满足如下定义：
//
// 结点左子树中所含节点的值 小于等于 当前节点的值
// 结点右子树中所含节点的值 大于等于 当前节点的值
// 左子树和右子树都是二叉搜索树
//
//
// 示例 1：
//
//
// 输入：root = [1,null,2,2]
// 输出：[2]
// 示例 2：
//
// 输入：root = [0]
// 输出：[0]
//
//
// 提示：
//
// 树中节点的数目在范围 [1, 104] 内

import { TreeNode, arrayToTree } from "./helper";

// -105 <= Node.val <= 105
function findMode(root: TreeNode | null): number[] {
  const result: number[] = [];
  let maxCounter = 1;
  let counter = 0;
  let pre: TreeNode | null = null;
  const traverse = (node: TreeNode | null) => {
    if (node == null) return;
    traverse(node.left);
    if (pre == null) {
      counter = 1;
    } else if (pre.val === node.val) {
      counter++;
    } else {
      counter = 1;
    }
    pre = node;
    if (counter > maxCounter) {
      maxCounter = counter;
      result.length = 0;
      result.push(node.val);
    } else if (counter === maxCounter) {
      result.push(node.val);
    }
    traverse(node.right);
  };
  traverse(root);
  return result;
}

import { describe, expect, test } from "vitest";

describe("find mode in bst", () => {
  test("case 1", () => {
    expect(findMode(arrayToTree([1, null, 2, 2])).sort()).toEqual([2]);
  });
  test("case 2", () => {
    expect(findMode(arrayToTree([0])).sort()).toEqual([0]);
  });
});
