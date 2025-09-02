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
type TRAVERSAL_TYPE = "iterative" | "recursive" | "mark-iterative";

const traversalType: TRAVERSAL_TYPE = "mark-iterative";

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

// null-mark
const inorderTraversalMarkIterative = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
  const stack: Array<BinaryTreeNode | null> = [];
  if (root != null) stack.push(root);
  while (stack.length) {
    const top = stack[stack.length - 1];
    if (top != null) {
      stack.pop();
      if (top.right) stack.push(top.right);
      stack.push(top);
      stack.push(null);
      if (top.left) stack.push(top.left);
    } else {
      stack.pop();
      const cur = stack.pop();
      traverseFn(cur!);
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
    case "mark-iterative":
      inorderTraversalMarkIterative(root, traverseFn);
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
const preorderTraversalMarkIterative = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
  const stack: Array<[BinaryTreeNode, boolean]> = [];
  if (root != null) stack.push([root, false]);
  while (stack.length) {
    const el = stack.pop()!;
    const visited = el[1];
    const node = el[0];
    if (visited) {
      traverseFn(node);
      continue;
    } else {
      if (node?.right) stack.push([node.right, false]);
      if (node?.left) stack.push([node.left, false]);
      stack.push([node, true]);
    }
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
    case "mark-iterative":
      preorderTraversalMarkIterative(root, traverseFn);
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
  const stack = [root];
  const result = [];
  while (stack.length) {
    const cur = stack.pop()!;
    result.push(cur);
    if (cur?.left) stack.push(cur.left);
    if (cur?.right) stack.push(cur.right);
  }
  for (let i = result.length - 1; i >= 0; i--) {
    traverseFn(result[i]);
  }
};
const postorderTraversalMarkIterative = (
  root: BinaryTreeNode | null,
  traverseFn: (node: BinaryTreeNode) => void,
) => {
    const stack: Array<[BinaryTreeNode, boolean]> = [];
    if (root != null) stack.push([root, false]);
    while (stack.length) {
      const el = stack.pop()!;
      const visited = el[1];
      const node = el[0];
      if (visited) {
        traverseFn(node);
      } else {
        stack.push([node, true]);
        if(node.right) stack.push([node.right, false]);
        if(node.left) stack.push([node.left, false]);
      }
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
    case "mark-iterative":
      postorderTraversalMarkIterative(root, traverseFn);
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
