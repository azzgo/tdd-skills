// 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
//
//
//
// 示例 1：
//
//
// 输入：head = [1,2,2,1]
// 输出：true
// 示例 2：
//
//
// 输入：head = [1,2]
// 输出：false
//
//
// 提示：
//
// 链表中节点数目在范围[1, 105] 内
// 0 <= Node.val <= 9
//
//
// 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

function isPalindrome(head: ListNode | null): boolean {
  if (head === null) return true;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast && fast?.next) {
    fast = fast?.next?.next;
    slow = slow.next!;
  }
  // reverse 后半段链表
  let current = slow;
  let prev: ListNode | null = null;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  let pre = head;
  let post = prev;

  while (pre && post) {
    if (pre.val !== post.val) {
      return false;
    }
    pre = pre.next;
    post = post.next;
  }
  return true;
}

import { describe, expect, test } from "vitest";
import { ListNode } from "./link";

describe("Palindrome linked list", () => {
  function buildList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  }

  test("回文链表: [1,2,2,1] 应返回 true", () => {
    const head = buildList([1, 2, 2, 1]);
    expect(isPalindrome(head)).toBe(true);
  });

  test.only("非回文链表: [1,2] 应返回 false", () => {
    const head = buildList([1, 2]);
    expect(isPalindrome(head)).toBe(false);
  });

  test("单节点链表: [1] 应返回 true", () => {
    const head = buildList([1]);
    expect(isPalindrome(head)).toBe(true);
  });

  test("回文链表: [1,2,3,2,1] 应返回 true", () => {
    const head = buildList([1, 2, 3, 2, 1]);
    expect(isPalindrome(head)).toBe(true);
  });

  test("非回文链表: [1,2,3,4,5] 应返回 false", () => {
    const head = buildList([1, 2, 3, 4, 5]);
    expect(isPalindrome(head)).toBe(false);
  });
});
