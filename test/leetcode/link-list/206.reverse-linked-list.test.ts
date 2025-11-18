/**
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 *
 * 示例 1：
 *
 * 输入：head = [1,2,3,4,5]
 * 输出：[5,4,3,2,1]
 *
 * 示例 2：
 *
 * 输入：head = [1,2]
 * 输出：[2,1]
 *
 * 示例 3：
 *
 * 输入：head = []
 * 输出：[]
 *
 * 提示：
 *
 *     链表中节点的数目范围是 [0, 5000]
 *     -5000 <= Node.val <= 5000
 *
 * 进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？
 **/
import { SingleListNode } from "./link";
import { expect, test } from "vitest";

function reverseList(head: ListNode | null): ListNode | null {
  if (head == null) {
    return null;
  }
  let currentListNode = head;
  let prevListNode: ListNode | null = null;
  while (currentListNode) {
    const nextListNode = currentListNode.next;
    currentListNode.next = prevListNode;
    prevListNode = currentListNode;
    currentListNode = nextListNode;
  }
  return prevListNode;
}

test("case 1", () => {
  const linkList = new SingleListNode(1);
  linkList.next = new SingleListNode(2);
  linkList.next.next = new SingleListNode(3);
  linkList.next.next.next = new SingleListNode(4);
  linkList.next.next.next.next = new SingleListNode(5);
  expect(reverseList(linkList)).toEqual({
    val: 5,
    next: {
      val: 4,
      next: {
        val: 3,
        next: {
          val: 2,
          next: {
            val: 1,
            next: null,
          },
        },
      },
    },
  });
});

test("case 2", () => {
  const linkList = new SingleListNode(1);
  linkList.next = new SingleListNode(2);
  expect(reverseList(linkList)).toEqual({
    val: 2,
    next: {
      val: 1,
      next: null,
    },
  });
});

test("case 3", () => {
  expect(reverseList(null)).toEqual(null);
});
