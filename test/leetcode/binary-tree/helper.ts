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
type TRAVERSAL_TYPE = "iterative" | "recursive";

const traversalType: TRAVERSAL_TYPE = "iterative";

const inorderTraversalRecursive = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
  if (!root?.val) {
    return;
  }
  inorderTraversal(root.left, traverseFn);
  traverseFn(root);
  inorderTraversal(root.right, traverseFn);
};

const inorderTraversalIterative = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
  if (!root?.val) {
    return;
  }
  const stack = [];
  let cur: BinaryTreeNode | null = root;
  while (cur != null || stack.length) {
    if (cur != null) {
      stack.push(cur);
      cur = cur.left;
    } else {
      cur = stack.pop()!;
      traverseFn(cur);
      cur = cur?.right;
    }
  }
};

export function inorderTraversal(
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) {
  switch (traversalType) {
    case "iterative":
      inorderTraversalIterative(root, traverseFn);
      break;
    case "recursive":
      inorderTraversalRecursive(root, traverseFn);
      break;
  }
}

const preorderTraversalRecursive = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
  if (!root?.val) {
    return;
  }
  traverseFn(root);
  preorderTraversal(root.left, traverseFn);
  preorderTraversal(root.right, traverseFn);
};

const preorderTraversalIterative = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
  if (!root?.val) {
    return [];
  }
  const stack: BinaryTreeNode[] = [root];
  while (stack.length) {
    const cur = stack.pop()!;
    traverseFn(cur);
    if (cur?.right) stack.push(cur.right);
    if (cur?.left) stack.push(cur.left);
  }
};

export function preorderTraversal(
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) {
  switch (traversalType) {
    case "iterative":
      preorderTraversalIterative(root, traverseFn);
      break;
    case "recursive":
      preorderTraversalRecursive(root, traverseFn);
      break;
  }
}

const postorderTraversalRecursive = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
  if (!root?.val) {
    return;
  }
  postorderTraversal(root.left, traverseFn);
  postorderTraversal(root.right, traverseFn);
  traverseFn(root);
};
const postorderTraversalIterative = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
  if (!root?.val) {
    return;
  }
  const stack = [root]
  const result = []
  while (stack.length) {
    const cur = stack.pop()!;
    result.push(cur);
    if (cur?.left) stack.push(cur.left);
    if (cur?.right) stack.push(cur.right);
  }
  for (let i = result.length -1 ; i >= 0 ; i--) {
    traverseFn(result[i]);
  }
};

export function postorderTraversal(
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) {
  switch (traversalType) {
    case "iterative":
      postorderTraversalIterative(root, traverseFn);
      break;
    case "recursive":
      postorderTraversalRecursive(root, traverseFn);
      break;
  }
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
