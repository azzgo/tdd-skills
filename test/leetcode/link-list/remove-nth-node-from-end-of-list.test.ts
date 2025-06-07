/**
 * * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 *
 * 示例 1：
 *
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 *
 * 示例 2：
 *
 * 输入：head = [1], n = 1
 * 输出：[]
 *
 * 示例 3：
 *
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 ***/

import { SingleListNode as ListNode } from "./link";
import { expect, test } from "vitest";

/**
 * 快慢指针法
 * 通过让两个指针间隔 n 个节点，并且同时移动这两个指针
 *    - 注意慢指针后相对快指针后移动，这样可以确保当快指针到达链表末尾时，慢指针正好在要删除的节点的前一个节点。
 * 当快指针到达链表末尾时，慢指针正好在要删除的节点的前一个节点。
 **/
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummy = new ListNode(0);
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;

  if (fast) {
    for (let i = 0; i <= n; i++) {
      fast = fast.next;
    }
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  if (slow && slow.next) {
    slow.next = slow.next.next;
  }

  return dummy.next;
}

test("case 1", () => {
  const head1 = ListNode.fromArray([1, 2, 3, 4, 5]);
  const expected1 = ListNode.fromArray([1, 2, 3, 5]);
  expect(removeNthFromEnd(head1, 2)?.toJSON()).toEqual(expected1?.toJSON());
});

test("case 2", () => {
  const head2 = ListNode.fromArray([1]);
  const expected2 = ListNode.fromArray([]);
  expect(removeNthFromEnd(head2, 1)?.toJSON()).toEqual(expected2?.toJSON());
});

test("case 3", () => {
  const head3 = ListNode.fromArray([1, 2]);
  const expected3 = ListNode.fromArray([1]);
  expect(removeNthFromEnd(head3, 1)?.toJSON()).toEqual(expected3?.toJSON());
});
