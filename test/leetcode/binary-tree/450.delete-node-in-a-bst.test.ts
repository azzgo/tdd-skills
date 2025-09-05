// 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
//
// 一般来说，删除节点可分为两个步骤：
//
// 首先找到需要删除的节点；
// 如果找到了，删除它。
//
//
// 示例 1:
//
// 输入：root = [5,3,6,2,4,null,7], key = 3
// 输出：[5,4,6,2,null,null,7]
// 解释：给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
// 一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
// 另一个正确答案是 [5,2,6,null,4,null,7]。
//
//
// 示例 2:
//
// 输入: root = [5,3,6,2,4,null,7], key = 0
// 输出: [5,3,6,2,4,null,7]
// 解释: 二叉树不包含值为 0 的节点
//
// 示例 3:
//
// 输入: root = [], key = 0
// 输出: []
//
//
// 提示:
//
// 节点数的范围 [0, 104].
// -105 <= Node.val <= 105
// 节点值唯一
// root 是合法的二叉搜索树
// -105 <= key <= 105
import { describe, expect, test } from "vitest";
import { TreeNode, arrayToTree, treeToArray } from "./helper";

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (root == null) return null;
  if (root.val === key) {
    // delete logic
    // 叶子节点,直接删除
    if (root.left == null && root.right == null) {
      return null;
    }
    // 左节点存在,右节点不存在.左节点补位
    if (root.left != null && root.right == null) {
      return root.left;
    }
    // 右节点存在,左节点不存在,右节点补位
    if (root.left == null && root.right != null) {
      return root.right;
    }
    // 两边节点都存在,需要将右节点挂到左节点子树下的最右侧节点的右方
    // 或者将左节点放到右节点子树下的最左侧节点的左节点上
    let cur = root.left;
    while (cur!.right != null) {
      cur = cur!.right;
    }
    cur!.right = root.right;
    return root.left;
  }
  // 理由二叉搜索树特性,减去不必要的遍历
  if (root.left != null && root.val > key) {
    root.left = deleteNode(root.left, key);
  } 
  // 理由二叉搜索树特性,减去不必要的遍历
  if (root.right != null && root.val < key) {
    root.right = deleteNode(root.right, key);
  }
  return root;
}

describe("deleteNode in BST", () => {
  test("删除存在的节点（示例1）", () => {
    const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
    const result = deleteNode(root, 3);
    // 结果可能有两种，任选其一即可
    const expect1 = [5, 4, 6, 2, null, null, 7];
    const expect2 = [5, 2, 6, null, 4, null, 7];
    const arr = treeToArray(result);
    expect(
      arr.every((v, i) => v === expect1[i]) ||
        arr.every((v, i) => v === expect2[i]),
    ).toBe(true);
  });

  test("删除不存在的节点（示例2）", () => {
    const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
    const result = deleteNode(root, 0);
    expect(treeToArray(result)).toEqual([5, 3, 6, 2, 4, null, 7]);
  });

  test("删除空树（示例3）", () => {
    const root = arrayToTree([]);
    const result = deleteNode(root, 0);
    expect(treeToArray(result)).toEqual([]);
  });

  test('[5,3,6,2,4,null,7]', () => {
    const root = arrayToTree([5,3,6,2,4,null,7]);
    const result = deleteNode(root, 7);
    expect(treeToArray(result)).toEqual([5,3,6,2,4]);
  });
});
