/**
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 *
 * 示例 1：
 *
 * 输入：head = [1,2,3,4,5], left = 2, right = 4
 * 输出：[1,4,3,2,5]
 *
 * 示例 2：
 *
 * 输入：head = [5], left = 1, right = 1
 * 输出：[5]
 *
 * 提示：
 *
 *     链表中节点数目为 n
 *     1 <= n <= 500
 *     -500 <= Node.val <= 500
 *     1 <= left <= right <= n
 *
 * 进阶： 你可以使用一趟扫描完成反转吗？
 **/
import { SingleListNode } from "./link";
import { test, expect } from "vitest";

function reverseBetween(
  head: SingleListNode | null,
  left: number,
  right: number,
): SingleListNode | null {
  if (head == null || left === right) {
    return head;
  }
  const dummy = new SingleListNode(0);
  dummy.next = head;
  let leftEdgeNode: SingleListNode | null = dummy;
  for (let i = 1; i < left; i++) {
    if (!leftEdgeNode.next) {
      return head; // left is out of bounds
    }
    leftEdgeNode = leftEdgeNode.next;
  }
  const currentListNode = leftEdgeNode.next;

  let currentIndex = left;
  while (currentListNode && currentIndex < right) {
    const nextListNode = currentListNode?.next ?? null;
    currentListNode.next = nextListNode?.next ?? null;
    if (nextListNode != null) {
      nextListNode.next = leftEdgeNode?.next ?? null;
    }
    leftEdgeNode.next = nextListNode;
    currentIndex++;
  }

  return dummy.next;
}

test("case 1", () => {
  return expect(
    reverseBetween(SingleListNode.fromArray([1, 2, 3, 4, 5]), 2, 4),
  ).toEqual({
    val: 1,
    next: {
      val: 4,
      next: {
        val: 3,
        next: {
          val: 2,
          next: {
            val: 5,
            next: null,
          },
        },
      },
    },
  });
});

test("case 2", () => {
  return expect(reverseBetween(SingleListNode.fromArray([5]), 1, 1)).toEqual({
    val: 5,
    next: null,
  });
});
