/**
 * Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
 *
 * A cycle exists if following the next pointers leads to a previously visited node.
 * The system uses an integer `pos` to indicate the position (0-indexed) where the tail connects to. If `pos` is -1, there is no cycle.
 * You must not modify the linked list.
 *
 * Examples:
 * 1. Input: head = [3,2,0,-4], pos = 1
 *    Output: returns the node at index 1
 *    Explanation: The tail connects to the second node.
 *
 * 2. Input: head = [1,2], pos = 0
 *    Output: returns the node at index 0
 *    Explanation: The tail connects to the first node.
 *
 * 3. Input: head = [1], pos = -1
 *    Output: returns null
 *    Explanation: There is no cycle.
 */


function detectCycle(head: ListNode | null): ListNode | null {
  let fast = head;
  let slow = head;
  // fast moves two steps, slow moves one step
  while (fast && fast.next) {
    fast = fast.next?.next;
    slow = slow.next;
    if (fast === slow) { 
      // cycle detected
      let entry = head;
      while (entry !== slow) {
        entry = entry.next;
        slow = slow.next;
      }
      return entry; // the node where the cycle begins
    }
  }
  return null; // no cycle detected
};

import { SingleListNode } from './link';
import { describe, expect, test } from 'vitest';

test('test case 1', () => {
  const head = SingleListNode.fromArray([3, 2, 0, -4]);
  const pos = 1;
  let cycleNode = head;
  for (let i = 0; i < pos; i++) {
    cycleNode = cycleNode.next!;
  }
  let tail = head;
  while (tail.next) {
    tail = tail.next;
  }
  tail.next = cycleNode;

  expect(detectCycle(head)).toBe(cycleNode);
});

test('test case 2', () => {
  const head = SingleListNode.fromArray([1, 2]);
  const pos = 0;
  let cycleNode = head;
  for (let i = 0; i < pos; i++) {
    cycleNode = cycleNode.next!;
  }
  let tail = head;
  while (tail.next) {
    tail = tail.next;
  }
  tail.next = cycleNode;

  expect(detectCycle(head)).toBe(cycleNode);
});

test('test case 3', () => {
  const head = SingleListNode.fromArray([1]);
  const pos = -1;

  expect(detectCycle(head)).toBeNull();
});
