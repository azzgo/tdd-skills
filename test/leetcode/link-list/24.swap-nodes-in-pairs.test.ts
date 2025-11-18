/**
 * 两两交换链表中的节点
 * 中等
 * 相关标签
 * premium lock icon相关企业
 *
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 *
 *
 *
 * 示例 1：
 *
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 *
 * 示例 2：
 *
 * 输入：head = []
 * 输出：[]
 *
 * 示例 3：
 *
 * 输入：head = [1]
 * 输出：[1]
 **/

import { SingleListNode as ListNode } from "./link";
import { expect, test } from "vitest";

function swapPairs(head: ListNode | null): ListNode | null {
  let dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;
  while (current.next && current.next.next) {
    let first = current.next;
    let second = current.next.next;

    first.next = second.next;
    second.next = first;
    current.next = second;

    current = first;
  }
  return dummy.next;
}

test("case 1", () => {
  const head1 = ListNode.fromArray([1, 2, 3, 4]);
  const expected1 = ListNode.fromArray([2, 1, 4, 3]);
  expect(swapPairs(head1)?.toJSON()).toEqual(expected1?.toJSON());
});

test("case 2", () => {
  const head2 = ListNode.fromArray([]);
  const expected2 = ListNode.fromArray([]);
  expect(swapPairs(head2)?.toJSON()).toEqual(expected2?.toJSON());
});

test("case 3", () => {
  const head3 = ListNode.fromArray([1]);
  const expected3 = ListNode.fromArray([1]);
  expect(swapPairs(head3)?.toJSON()).toEqual(expected3?.toJSON());
});
