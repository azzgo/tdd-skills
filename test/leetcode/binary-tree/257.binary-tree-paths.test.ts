// 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。
//
// 叶子节点 是指没有子节点的节点。
//
//
// 示例 1：
//
// 输入：root = [1,2,3,null,5]
// 输出：["1->2->5","1->3"]
//
// 示例 2：
//
// 输入：root = [1]
// 输出：["1"]
//
//
//
// 提示：
//
//     树中节点的数目在范围 [1, 100] 内
//     -100 <= Node.val <= 100

import { TreeNode, arrayToTree } from "./helper";

function binaryTreePaths(root: TreeNode | null): string[] {
  const paths = [];
  if (root == null) {
    return paths;
  }
  const traverse = (node:TreeNode, path = []) => {
    if (node.left == null && node.right == null) {
      paths.push([...path, node.val])
      return;
    }
    
    if (node.left != null) {
      traverse(node.left, [...path, node.val]);
    }
    if (node.right != null) {
      traverse(node.right, [...path, node.val]);
    }
  }
  traverse(root);

  return paths.map(path => path.join('->'));
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("binanry tree path", () => {
  test("case 2", () => {
    const root = arrayToTree([1]);
    const result = binaryTreePaths(root);
    expect(result).toEqual(["1"]);
  });

  test("case 1", () => {
    const root = arrayToTree([1, 2, 3, null, 5]);
    const result = binaryTreePaths(root);
    expect(result.sort()).toEqual(["1->2->5", "1->3"].sort());
  });
});
