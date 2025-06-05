/**
 * 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
 * 示例 1：
 *
 * 输入：head = [1,2,6,3,4,5,6], val = 6
 * 输出：[1,2,3,4,5]
 *
 * 示例 2：
 *
 * 输入：head = [], val = 1
 * 输出：[]
 *
 * 示例 3：
 *
 * 输入：head = [7,7,7,7], val = 7
 * 输出：[]
 *
 * 提示：
 *
 *     列表中的节点数目在范围 [0, 104] 内
 *     1 <= Node.val <= 50
 *     0 <= val <= 50
 **/

import { SingleListNode } from "./link";
import { expect, test } from "vitest";

function removeElements(
  head: SingleListNode | null,
  val: number,
): SingleListNode | null {
  if (head == null) {
    return null;
  }
  const dummyHead = new SingleListNode(0);
  dummyHead.next = head;
  let curListNode = dummyHead;
  while (curListNode) {
    if (curListNode.next == null) {
      break;
    }
    while (curListNode.next && curListNode.next!.val === val) {
      curListNode.next = curListNode.next.next;
    }
    curListNode = curListNode.next;
  }
  return dummyHead.next;
}

// 测试用例
test("case 1", () => {
  const linkList = new SingleListNode(1);
  linkList.next = new SingleListNode(2);
  linkList.next.next = new SingleListNode(6);
  linkList.next.next.next = new SingleListNode(3);
  linkList.next.next.next.next = new SingleListNode(4);
  linkList.next.next.next.next.next = new SingleListNode(5);
  linkList.next.next.next.next.next.next = new SingleListNode(6);
  expect(removeElements(linkList, 6)).toEqual({
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 4,
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
  const linkList = new SingleListNode(7);
  linkList.next = new SingleListNode(7);
  linkList.next.next = new SingleListNode(7);
  linkList.next.next.next = new SingleListNode(7);
  expect(removeElements(linkList, 7)).toEqual(null);
});

test("case 3", () => {
  const linkList = new SingleListNode(1);
  expect(removeElements(linkList, 1)).toEqual(null);
});

test("case 4", () => {
  const linkList = new SingleListNode(1);
  linkList.next = new SingleListNode(2);
  linkList.next.next = new SingleListNode(2);
  linkList.next.next.next = new SingleListNode(1);
  expect(removeElements(linkList, 2)).toEqual({
    val: 1,
    next: {
      val: 1,
      next: null,
    },
  });
});
