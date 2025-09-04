// 给定一个不重复的整数数组 nums 。 最大二叉树 可以用下面的算法从 nums 递归地构建:
//
//     创建一个根节点，其值为 nums 中的最大值。
//     递归地在最大值 左边 的 子数组前缀上 构建左子树。
//     递归地在最大值 右边 的 子数组后缀上 构建右子树。
//
// 返回 nums 构建的 最大二叉树 。
//
// 示例 1：
//
// 输入：nums = [3,2,1,6,0,5]
// 输出：[6,3,5,null,2,0,null,null,1]
// 解释：递归调用如下所示：
// - [3,2,1,6,0,5] 中的最大值是 6 ，左边部分是 [3,2,1] ，右边部分是 [0,5] 。
//     - [3,2,1] 中的最大值是 3 ，左边部分是 [] ，右边部分是 [2,1] 。
//         - 空数组，无子节点。
//         - [2,1] 中的最大值是 2 ，左边部分是 [] ，右边部分是 [1] 。
//             - 空数组，无子节点。
//             - 只有一个元素，所以子节点是一个值为 1 的节点。
//     - [0,5] 中的最大值是 5 ，左边部分是 [0] ，右边部分是 [] 。
//         - 只有一个元素，所以子节点是一个值为 0 的节点。
//         - 空数组，无子节点。
//
// 示例 2：
//
// 输入：nums = [3,2,1]
// 输出：[3,null,2,null,1]
//
// 提示：
//
//     1 <= nums.length <= 1000
//     0 <= nums[i] <= 1000
//     nums 中的所有整数 互不相同
import { describe, expect, test } from "vitest";
import { TreeNode, treeToArray } from "./helper";

const implemntType: "recursive" | "decreaseStack" = "decreaseStack";

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  switch (implemntType) {
    case "recursive":
      return constructMaximumBinaryTreeRecursive(nums);
    case "decreaseStack":
      return constructMaximumBinaryTreeSingleDescriseStack(nums);
  }
}
// O(n^2)
function constructMaximumBinaryTreeRecursive(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  if (nums.length === 1) return new TreeNode(nums[0]);
  const max = Math.max(...nums);
  const index = nums.indexOf(max);
  const leftPart = nums.slice(0, index);
  const rightPart = nums.slice(index + 1);
  const node = new TreeNode(max);
  if (leftPart.length) node.left = constructMaximumBinaryTree(leftPart);
  if (rightPart.length) node.right = constructMaximumBinaryTree(rightPart);
  return node;
}

// O(n)
function constructMaximumBinaryTreeSingleDescriseStack(
  nums: number[],
): TreeNode | null {
  // left[i] 记录 nums[i] 左边第一个比 nums[i] 大的元素下标
  const left = new Array(nums.length).fill(-1);
  // right[i] 记录 nums[i] 右边第一个比 nums[i] 大的元素下标
  const right = new Array(nums.length).fill(-1);
  // tree[i] 存储 nums[i] 对应的 TreeNode 实例
  const tree = new Array(nums.length).fill(-1);
  // 单调栈，存储下标，维护递减序列
  const stack: number[] = [];

  // 第一遍遍历，填充 left、right 数组，并创建节点
  for (let i = 0; i < nums.length; i++) {
    tree[i] = new TreeNode(nums[i]);
    // 当前元素比栈顶元素大，说明栈顶元素的右边第一个更大元素是当前元素
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      right[stack.pop()!] = i;
    }
    // 栈顶元素就是当前元素左边第一个比它大的元素
    if (stack.length) {
      left[i] = stack[stack.length - 1];
    }
    // 当前元素入栈
    stack.push(i);
  }

  let root: TreeNode | null = null;
  // 第二遍遍历，根据 left、right 数组连接节点
  for (let i = 0; i < nums.length; i++) {
    // 如果左右都没有更大的元素，说明是最大值，作为根节点
    if (left[i] === -1 && right[i] === -1) {
      root = tree[i];
    } else if (
      // 如果右边没有更大的元素，或者左边的更大元素比右边的更大元素小
      // 说明左边的更大元素是父节点(比右边right[i]小)，把当前节点挂到它的右子树
      // 解释：因为大的应该是更大元素的儿子节点。nums[i] 只配成为right[i] 的 后代节点，而不是直属子节点
      right[i] === -1 ||
      (left[i] !== -1 && nums[left[i]] < nums[right[i]])
    ) {
      tree[left[i]].right = tree[i];
      // 否则存在右边的更大元素是父节点(比左边 left[i] 小)，把当前节点挂到它的左子树
    } else {
      tree[right[i]].left = tree[i];
    }
  }

  return root;
}

describe("maximum binary tree", () => {
  test("case 1", () => {
    expect(treeToArray(constructMaximumBinaryTree([3, 2, 1, 6, 0, 5]))).toEqual(
      [6, 3, 5, null, 2, 0, null, null, 1],
    );
  });

  test("case 2", () => {
    expect(treeToArray(constructMaximumBinaryTree([3, 2, 1]))).toEqual([
      3,
      null,
      2,
      null,
      1,
    ]);
  });
});
