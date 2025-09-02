export class BinaryTreeNode {
  val: number;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
  constructor(
    val: number,
    left: BinaryTreeNode | null = null,
    right: BinaryTreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function inorderTraversal(
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) {
  if (!root?.val) {
    return;
  }
  inorderTraversal(root.left, traverseFn);
  traverseFn(root);
  inorderTraversal(root.right, traverseFn);
}
export function preorderTraversal(
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) {
  if (!root?.val) {
    return;
  }
  traverseFn(root);
  preorderTraversal(root.left, traverseFn);
  preorderTraversal(root.right, traverseFn);
}
export function postorderTraversal(
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) {
  if (!root?.val) {
    return;
  }
  postorderTraversal(root.left, traverseFn);
  postorderTraversal(root.right, traverseFn);
  traverseFn(root);
}
export function levelOrderTraversal(
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) {
  const queue = [];
  let current;
  queue.push(root);
  while (queue.length) {
    // 消费当前层数据
    current = queue.shift()!;
    traverseFn(current);
    // 将下一层的先推入队列
    if (current.left) {
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    }
  }
}
