// 21. 合并两个有序链表
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
//
//
//
// 示例 1：
//
//
// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]
// 示例 2：
//
// 输入：l1 = [], l2 = []
// 输出：[]
// 示例 3：
//
// 输入：l1 = [], l2 = [0]
// 输出：[0]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  const dummy = new ListNode();
  let cur1 = list1;
  let cur2 = list2;
  let cur: ListNode = dummy;
  while (cur1 && cur2) {
    if (cur1!.val >= cur2!.val) {
      cur.next = cur2;
      cur2 = cur2!.next;
    } else if (cur1!.val < cur2!.val) {
      cur.next = cur1;
      cur1 = cur1!.next;
    }
    cur = cur!.next!;
  }
  // 说明 cur1 或 cur2 有一个已经为空,把剩下那个接到新的链表上就行了
  cur.next = cur1 || cur2;

  return dummy.next;
}

import { describe, expect, test } from "vitest";
import { ListNode } from "./link";

describe("Merge two sorted list", () => {
  function arrayToList(arr: number[]): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const n of arr) {
      curr.next = new ListNode(n);
      curr = curr.next;
    }
    return dummy.next;
  }

  function listToArray(head: ListNode | null): number[] {
    const res: number[] = [];
    while (head) {
      res.push(head.val);
      head = head.next;
    }
    return res;
  }

  test("合并两个非空有序链表", () => {
    const l1 = arrayToList([1, 2, 4]);
    const l2 = arrayToList([1, 3, 4]);
    const merged = mergeTwoLists(l1, l2);
    expect(listToArray(merged)).toEqual([1, 1, 2, 3, 4, 4]);
  });

  test("合并两个空链表", () => {
    const l1 = arrayToList([]);
    const l2 = arrayToList([]);
    const merged = mergeTwoLists(l1, l2);
    expect(listToArray(merged)).toEqual([]);
  });

  test("一个链表为空，另一个非空", () => {
    const l1 = arrayToList([]);
    const l2 = arrayToList([0]);
    const merged = mergeTwoLists(l1, l2);
    expect(listToArray(merged)).toEqual([0]);
  });
});
