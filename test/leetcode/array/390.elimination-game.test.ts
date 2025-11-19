// 列表 arr 由在范围 [1, n] 中的所有整数组成，并按严格递增排序。请你对 arr 应用下述算法：
//
// 从左到右，删除第一个数字，然后每隔一个数字删除一个，直到到达列表末尾。
// 重复上面的步骤，但这次是从右到左。也就是，删除最右侧的数字，然后剩下的数字每隔一个删除一个。
// 不断重复这两步，从左到右和从右到左交替进行，直到只剩下一个数字。
// 给你整数 n ，返回 arr 最后剩下的数字。
//
//
//
// 示例 1：
//
// 输入：n = 9
// 输出：6
// 解释：
// arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// arr = [2, 4, 6, 8]
// arr = [2, 6]
// arr = [6]
// 示例 2：
//
// 输入：n = 1
// 输出：1

function lastRemaining(n: number): number {
  // 模拟解法
  // let arr = Array.from({ length: n }, (_, index) => index + 1);
  // let isForward = true;
  //
  // while (arr.length) {
  //   if (arr.length === 1) {
  //     return arr[0];
  //   }
  //   // 正向
  //   if (isForward) {
  //     arr = arr.filter((_, i) => i % 2 === 1);
  //     isForward = false;
  //   } else {
  //     const left = arr.length % 2 === 0 ? 0 : 1; 
  //     arr = arr.filter((_, i) => i % 2 === left);
  //     isForward = true;
  //   }
  // }

  // 数学解法
  let head = 1;
  let times = 0, leftNums = n, step = 1;
  while (leftNums > 1) {
    if (times % 2 === 0) { // 正向
      head = head + step;
    } else { // 反向
      head = (leftNums % 2 === 0) ? head : head + step;
    }
    times++;
    leftNums = Math.floor(leftNums / 2);
    step = step * 2;
  }
  return head;
}


import { describe, expect, test } from "vitest";

describe("elimination game", () => {
  test("n = 9 时，最后剩下的数字应为 6", () => {
    expect(lastRemaining(9)).toBe(6);
  });

  test("n = 1 时，最后剩下的数字应为 1", () => {
    expect(lastRemaining(1)).toBe(1);
  });
  test("n = 6 时，最后剩下的数字应为 4", () => {
    expect(lastRemaining(6)).toBe(4);
  });
});
