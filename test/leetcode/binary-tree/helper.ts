export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(
    val: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
type TRAVERSAL_TYPE = "iterative" | "recursive" | "mark-iterative" | "morris";
const traversalType: TRAVERSAL_TYPE = "mark-iterative";

const inorderTraversalRecursive = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  if (root == null) {
    return;
  }
  inorderTraversal(root.left, traverseFn);
  traverseFn(root);
  inorderTraversal(root.right, traverseFn);
};

const inorderTraversalIterative = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  if (root == null) {
    return;
  }
  const stack = [];
  let cur: TreeNode | null = root;
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

// Morris 中序遍历
const inorderTraversalMorris = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  let cur = root;
  while (cur) {
    if (!cur.left) {
      traverseFn(cur);
      cur = cur.right;
    } else {
      let predecessor = cur.left;
      while (predecessor.right && predecessor.right !== cur) {
        predecessor = predecessor.right;
      }
      if (!predecessor.right) {
        predecessor.right = cur;
        cur = cur.left;
      } else {
        predecessor.right = null;
        traverseFn(cur);
        cur = cur.right;
      }
    }
  }
};

// null-mark
const inorderTraversalMarkIterative = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  const stack: Array<TreeNode | null> = [];
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
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
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
    case "morris":
      inorderTraversalMorris(root, traverseFn);
      break;
  }
}

const preorderTraversalRecursive = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  if (root == null) {
    return;
  }
  traverseFn(root);
  preorderTraversal(root.left, traverseFn);
  preorderTraversal(root.right, traverseFn);
};

const preorderTraversalIterative = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  if (root == null) {
    return [];
  }
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const cur = stack.pop()!;
    traverseFn(cur);
    if (cur?.right) stack.push(cur.right);
    if (cur?.left) stack.push(cur.left);
  }
};
// Morris 先序遍历
const preorderTraversalMorris = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  let cur = root;
  while (cur) {
    if (!cur.left) {
      traverseFn(cur);
      cur = cur.right;
    } else {
      let predecessor = cur.left;
      while (predecessor.right && predecessor.right !== cur) {
        predecessor = predecessor.right;
      }
      if (!predecessor.right) {
        traverseFn(cur);
        predecessor.right = cur;
        cur = cur.left;
      } else {
        predecessor.right = null;
        cur = cur.right;
      }
    }
  }
};
const preorderTraversalMarkIterative = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  const stack: Array<[TreeNode, boolean]> = [];
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
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
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
    case "morris":
      preorderTraversalMorris(root, traverseFn);
      break;
  }
}

const postorderTraversalRecursive = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  if (root == null) {
    return;
  }
  postorderTraversal(root.left, traverseFn);
  postorderTraversal(root.right, traverseFn);
  traverseFn(root);
};
const postorderTraversalIterative = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  if (root == null) {
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
// Morris 后序遍历
const postorderTraversalMorris = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  throw new Error("not Implement yet");
};

const postorderTraversalMarkIterative = (
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
) => {
  const stack: Array<[TreeNode, boolean]> = [];
  if (root != null) stack.push([root, false]);
  while (stack.length) {
    const el = stack.pop()!;
    const visited = el[1];
    const node = el[0];
    if (visited) {
      traverseFn(node);
    } else {
      stack.push([node, true]);
      if (node.right) stack.push([node.right, false]);
      if (node.left) stack.push([node.left, false]);
    }
  }
};

export function postorderTraversal(
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
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
      break;
    case "morris":
      postorderTraversalMorris(root, traverseFn);
      break;
  }
}
export function levelOrderTraversal(
  root: TreeNode | null,
  traverseFn: (node: TreeNode) => void,
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

type element = number | null;

export function arrayToTree(arr: element[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]!);
  const queue: (TreeNode | null)[] = [root];
  let i = 1;
  while (i < arr.length) {
    const parent = queue.shift();
    if (parent) {
      // 挂载左孩子
      if (i < arr.length) {
        if (arr[i] !== null) {
          parent.left = new TreeNode(arr[i]!);
          queue.push(parent.left);
        }
        i++;
      }
      // 挂载右孩子
      if (i < arr.length) {
        if (arr[i] !== null) {
          parent.right = new TreeNode(arr[i]!);
          queue.push(parent.right);
        }
        i++;
      }
    }
  }
  return root;
}

// 将二叉树按层序转为数组
export function treeToArray(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }
  // 去除末尾多余的 null
  while (result.length && result[result.length - 1] === null) {
    result.pop();
  }
  return result as number[];
}
