// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
//
// 图示两个链表在节点 c1 开始相交：
//
//
//
// 题目数据 保证 整个链式结构中不存在环。
//
// 注意，函数返回结果后，链表必须 保持其原始结构 。
//
// 自定义评测：
//
// 评测系统 的输入如下（你设计的程序 不适用 此输入）：
//
// intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
// listA - 第一个链表
// listB - 第二个链表
// skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
// skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
// 评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。
//
//
//
// 示例 1：
//
//
//
// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
// 输出：Intersected at '8'
// 解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
// 在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
// — 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内存中指向两个不同的位置，而链表 A 和链表 B 中值为 8 的节点 (A 中第三个节点，B 中第四个节点) 在内存中指向相同的位置。
//
//
// 示例 2：
//
//
//
// 输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
// 输出：Intersected at '2'
// 解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
// 在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
// 示例 3：
//
//
//
// 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
// 输出：No intersection
// 解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
// 由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
// 这两个链表不相交，因此返回 null 。
//
//
// 提示：
//
// listA 中节点数目为 m
// listB 中节点数目为 n
// 1 <= m, n <= 3 * 104
// 1 <= Node.val <= 105
// 0 <= skipA <= m
// 0 <= skipB <= n
// 如果 listA 和 listB 没有交点，intersectVal 为 0
// 如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB]
//
//
// 进阶：你能否设计一个时间复杂度 O(m + n) 、仅用 O(1) 内存的解决方案？
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  let a = headA;
  let b = headB;
  if (a == null || b === null) return null;
  // 这里思路不太容易想到,这里做了一个双指针交替遍历的操作
  // [步骤1] 假设两个链表长度为 m, n
  // 当一个到末尾(假设是n先到末尾), m 到 n
  // m: |--------x---| n
  // n: |--------x     n
  // [步骤2] n 的指针变到m的头部, 两个指针相离 n, 然后又走到底部,这次是 m 的指针
  // m: |---x--------x m 和 m-n
  // n: |--------|
  // [步骤3] m 到尾部,切换到n的链表上, 如果不相交,两个指针必定同时到达尾部的 null, 如果相交,必定相会于交点
  // m: |------------x  m-n+n = m
  // n: |--------x      n     = n
  while (a !== b) {
    a = a == null ? headB : a.next;
    b = b == null ? headA : b.next;
  }

  return a;
}

import { describe, expect, test } from "vitest";
import { ListNode } from "./link";

// 辅助函数：根据数组和交点构造链表
function createLinkedLists(
  listA: number[],
  listB: number[],
  skipA: number,
  skipB: number,
): [ListNode | null, ListNode | null, ListNode | null] {
  function arrayToList(arr: number[]): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const val of arr) {
      curr.next = new ListNode(val);
      curr = curr.next;
    }
    return dummy.next;
  }
  let intersect = null;
  const headA = arrayToList(listA);
  let headB = arrayToList(listB);
  if (skipA < listA.length && skipB < listB.length) {
    let currA = headA;
    for (let i = 0; i < skipA; i++) currA = currA!.next;
    let currB = headB;
    for (let i = 0; i < skipB; i++) currB = currB!.next;
    intersect = currA;
    // 让B的skipB节点指向A的skipA节点
    let prevB = headB;
    for (let i = 0; i < skipB - 1; i++) prevB = prevB!.next;
    if (skipB === 0) {
      headB = intersect;
    } else {
      prevB!.next = intersect;
    }
  }
  return [headA, headB, intersect];
}

describe("Intersection of two linked lists", () => {
  test("有交点: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]", () => {
    const [headA, headB, intersect] = createLinkedLists(
      [4, 1, 8, 4, 5],
      [5, 6, 1, 8, 4, 5],
      2,
      3,
    );
    const result = getIntersectionNode(headA, headB);
    expect(result).toBe(intersect);
    expect(result?.val).toBe(8);
  });

  test("有交点: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4]", () => {
    const [headA, headB, intersect] = createLinkedLists(
      [1, 9, 1, 2, 4],
      [3, 2, 4],
      3,
      1,
    );
    const result = getIntersectionNode(headA, headB);
    expect(result).toBe(intersect);
    expect(result?.val).toBe(2);
  });

  test("无交点: listA = [2,6,4], listB = [1,5]", () => {
    // skipA/skipB无意义
    const [headA, headB] = [
      (function () {
        const dummy = new ListNode(0);
        let curr = dummy;
        for (const v of [2, 6, 4]) {
          curr.next = new ListNode(v);
          curr = curr.next;
        }
        return dummy.next;
      })(),
      (function () {
        const dummy = new ListNode(0);
        let curr = dummy;
        for (const v of [1, 5]) {
          curr.next = new ListNode(v);
          curr = curr.next;
        }
        return dummy.next;
      })(),
    ];
    const result = getIntersectionNode(headA, headB);
    expect(result).toBe(null);
  });
});
