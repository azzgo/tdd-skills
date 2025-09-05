// 给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。
//
// 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 任意有效的结果 。
//
// 示例 1：
// 输入：root = [4,2,7,1,3], val = 5
// 输出：[4,2,7,1,3,5]
// 解释：另一个满足题目要求可以通过的树是：
//
// 示例 2：
// 输入：root = [40,20,60,10,30,50,70], val = 25
// 输出：[40,20,60,10,30,50,70,null,null,25]
//
// 示例 3：
// 输入：root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
// 输出：[4,2,7,1,3,5]
//
//
// 提示：
//
// 树中的节点数将在 [0, 104]的范围内。
// -108 <= Node.val <= 108
// 所有值 Node.val 是 独一无二 的。
// -108 <= val <= 108
// 保证 val 在原始BST中不存在。
import { describe, expect, test } from "vitest";
import { TreeNode, arrayToTree, treeToArray } from "./helper";

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root == null) return new TreeNode(val);
  let cur = root;
  let parent = root;
  while (cur != null) {
    parent = cur;
    if (cur.val > val) {
      cur = cur.left;
    } else if (cur.val < val) {
      cur = cur.right;
    }
  }
  cur = new TreeNode(val);
  if (parent!.val > val) {
    parent!.left = cur;
  } else {
    parent!.right = cur;
  }
  return root;
}

describe("insertIntoBST", () => {
  test("示例1：插入5到[4,2,7,1,3]", () => {
    const root = arrayToTree([4, 2, 7, 1, 3]);
    const val = 5;
    const result = insertIntoBST(root, val);
    // 可能有多种有效结果，只需包含5且为BST
    expect(treeToArray(result)).toEqual([4, 2, 7, 1, 3, 5]);
  });

  test("示例2：插入25到[40,20,60,10,30,50,70]", () => {
    const root = arrayToTree([40, 20, 60, 10, 30, 50, 70]);
    const val = 25;
    const result = insertIntoBST(root, val);
    expect(treeToArray(result)).toEqual([
      40,
      20,
      60,
      10,
      30,
      50,
      70,
      null,
      null,
      25,
    ]);
  });

  test("示例3：插入5到[4,2,7,1,3,null,null,null,null,null,null]", () => {
    const root = arrayToTree([
      4,
      2,
      7,
      1,
      3,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
    const val = 5;
    const result = insertIntoBST(root, val);
    expect(treeToArray(result)).toEqual([4, 2, 7, 1, 3, 5]);
  });

  test("空树插入", () => {
    const root = arrayToTree([]);
    const val = 1;
    const result = insertIntoBST(root, val);
    expect(treeToArray(result)).toEqual([1]);
  });

  test("插入最小值", () => {
    const root = arrayToTree([2]);
    const val = 1;
    const result = insertIntoBST(root, val);
    expect(treeToArray(result)).toEqual([2, 1]);
  });

  test("插入最大值", () => {
    const root = arrayToTree([2]);
    const val = 3;
    const result = insertIntoBST(root, val);
    expect(treeToArray(result)).toEqual([2, null, 3]);
  });
});
