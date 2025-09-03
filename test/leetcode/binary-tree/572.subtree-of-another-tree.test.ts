// 给你两棵二叉树 root 和 subRoot 。检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true ；否则，返回 false 。
//
// 二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树。
// 示例 1：
//
// 输入：root = [3,4,5,1,2], subRoot = [4,1,2]
// 输出：true
// 示例 2：
//
// 输入：root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
// 输出：false
import { arrayToTree, TreeNode } from "./helper";

const algorithmType: "dfs" | "kmp" | "hash" = "dfs";

function isSubtreeDfs(
  root: TreeNode | null,
  subRoot: TreeNode | null,
): boolean {
  function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p == null && q != null) return false;
    else if (p != null && q == null) return false;
    else if (p == null && q == null) return true;
    else if (p?.val !== q?.val) return false;

    return isSameTree(p!.left, q!.left) && isSameTree(p!.right, q!.right);
  }
  const queue = [root];

  while (queue.length) {
    const cur = queue.shift()!;
    if (isSameTree(cur, subRoot)) {
      return true;
    }
    if (cur.left) queue.push(cur.left);
    if (cur.right) queue.push(cur.right);
  }
  return false;
}
function isSubtreeKMP(
  root: TreeNode | null,
  subRoot: TreeNode | null,
): boolean {
  throw new Error("to be implement");
}

function isSubtreeHash(
  root: TreeNode | null,
  subRoot: TreeNode | null,
): boolean {
  throw new Error("to be implement");
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  switch (algorithmType) {
    case "dfs":
      return isSubtreeDfs(root, subRoot);
    case "kmp":
      return isSubtreeKMP(root, subRoot);
    case "hash":
      return isSubtreeHash(root, subRoot);
    default:
      // 可以根据需要处理未知类型
      throw new Error(`Unknown algorithm type: ${algorithmType}`);
  }
}

import { beforeEach, describe, expect, test } from "vitest";

describe("Subtree of another tree", () => {
  beforeEach(() => {});

  test("case 1", () => {
    const root = arrayToTree([3, 4, 5, 1, 2]);
    const subRoot = arrayToTree([4, 1, 2]);
    expect(isSubtree(root, subRoot)).toBe(true);
  });
  test("case 2", () => {
    const root = arrayToTree([3, 4, 5, 1, 2, null, null, null, null, 0]);
    const subRoot = arrayToTree([4, 1, 2]);
    expect(isSubtree(root, subRoot)).toBe(false);
  });
});
