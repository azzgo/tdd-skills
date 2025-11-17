// 设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。
//
// 示例：
//
// 输入： arr = [1,3,5,7,2,4,6,8], k = 4
// 输出： [1,2,3,4]
// 提示：
//
// 0 <= len(arr) <= 100000
// 0 <= k <= min(100000, len(arr))

// 这个题,和 347.top-k-frequent-elements 的解法类似
// 这里可以建立一个 k 大小的大顶堆,最后吧堆依次输出就是所需结果

class MaxHeap {
  // 二叉树的数组表示法, 父节点的子节点是 2i + 1或 2i + 2
  // 子节点的父节点位置在 (i-1)/2
  private items: number[] = [];
  enqueue(value: number) {
    this.items.push(value);
    let index = this.items.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (parentIndex >= 0 && this.items[index] > this.items[parentIndex]) {
      [this.items[index], this.items[parentIndex]] = [
        this.items[parentIndex],
        this.items[index],
      ];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  dequeue(): number | undefined {
    if (this.items.length === 0) return;
    if (this.items.length === 1) return this.items.pop();

    // 出堆顶数据
    const out = this.items[0];

    // 顶部位置由最后一项填充,然后修正堆数据
    this.items[0] = this.items.pop()!;

    let parentIndex = 0;

    while (true) {
      const leftChild = parentIndex * 2 + 1;
      const rightChild = parentIndex * 2 + 2;
      let largest = parentIndex;

      // 找到父节点和子节点中的最大值重要
      if (
        leftChild < this.items.length &&
        this.items[leftChild] > this.items[largest]
      ) {
        largest = leftChild;
      }

      if (
        rightChild < this.items.length &&
        this.items[rightChild] > this.items[largest]
      ) {
        largest = rightChild;
      }

      // 如果父节点已经是最大的，堆性质满足
      if (largest === parentIndex) {
        break;
      }

      // 交换父节点与最大子节点
      [this.items[parentIndex], this.items[largest]] = [
        this.items[largest],
        this.items[parentIndex],
      ];

      // 继续向下调整
      parentIndex = largest;
    }

    return out;
  }

  peek() {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

function smallestK(arr: number[], k: number): number[] {
  if (k === 0) return [];
  const heap = new MaxHeap();
  for (let i = 0; i < arr.length; i++) {
    heap.enqueue(arr[i]);
    if (heap.size() > k) {
      heap.dequeue();
    }
  }
  const result: number[] = [];
  while (heap.size() > 0) {
    result.push(heap.dequeue()!);
  }
  return result;
}

import { describe, expect, test } from "vitest";

describe("Smallest k test", () => {
  test("case 1", () => {
    expect(smallestK([1, 3, 5, 7, 2, 4, 6, 8], 4)).toEqual(
      expect.arrayContaining([1, 2, 4, 3]),
    );
  });

  test("case 2", () => {
    expect(smallestK([1, 3, 3, 7, 2, 4, 6, 8], 4)).toEqual(
      expect.arrayContaining([1, 2, 3, 3]),
    );
  });

  test("case 2", () => {
    expect(
      smallestK(
        [
          62577, -220, -8737, -22, -6, 59956, 5363, -16699, 0, -10603, 64,
          -24528, -4818, 96, 5747, 2638, -223, 37663, -390, 35778, -4977, -3834,
          -56074, 7, -76, 601, -1712, -48874, 31, 3, -9417, -33152, 775, 9396,
          60947, -1919, 683, -37092, -524, -8, 1458, 80, -8, 1, 7, -355, 9, 397,
          -30, -21019, -565, 8762, -4, 531, -211, -23702, 3, 3399, -67, 64542,
          39546, 52500, -6263, 4, -16, -1, 861, 5134, 8, 63701, 40202, 43349,
          -4283, -3, -22721, -6, 42754, -726, 118, 51, 539, 790, -9972, 41752,
          0, 31, -23957, -714, -446, 4, -61087, 84, -140, 6, 53, -48496, 9,
          -15357, 402, 5541, 4, 53936, 6, 3, 37591, 7, 30, -7197, -26607, 202,
          140, -4, -7410, 2031, -715, 4, -60981, 365, -23620, -41, 4, -2482,
          -59, 5, -911, 52, 50068, 38, 61, 664, 0, -868, 8681, -8, 8, 29, 412,
        ],
        131,
      ).sort(),
    ).toEqual(
      [
        -61087, -60981, -56074, -48874, -48496, -37092, -33152, -26607, -24528,
        -23957, -23702, -23620, -22721, -21019, -16699, -15357, -10603, -9972,
        -9417, -8737, -7410, -7197, -6263, -4977, -4818, -4283, -3834, -2482,
        -1919, -1712, -911, -868, -726, -715, -714, -565, -524, -446, -390,
        -355, -223, -220, -211, -140, -76, -67, -59, -41, -30, -22, -16, -8, -8,
        -8, -6, -6, -4, -4, -3, -1, 0, 0, 0, 1, 3, 3, 3, 4, 4, 4, 4, 4, 5, 6, 6,
        7, 7, 7, 8, 8, 9, 9, 29, 30, 31, 31, 38, 51, 52, 53, 61, 64, 80, 84, 96,
        118, 140, 202, 365, 397, 402, 412, 531, 539, 601, 664, 683, 775, 790,
        861, 1458, 2031, 2638, 3399, 5134, 5363, 5541, 5747, 8681, 8762, 9396,
        35778, 37591, 37663, 39546, 40202, 41752, 42754, 43349, 50068, 52500,
      ].sort(),
    );
  });
});
