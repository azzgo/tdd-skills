// 42. 接雨水
// 困难
// 相关标签
// premium lock icon相关企业
//
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
//
//
//
// 示例 1：
//
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
//
// 示例 2：
//
// 输入：height = [4,2,0,3,2,5]
// 输出：9
//
//
//
// 提示：
//
//     n == height.length
//     1 <= n <= 2 * 104
//     0 <= height[i] <= 105

function trapForce(height: number[]): number {
  let sum = 0;
  for (let i = 0; i < height.length; i++) {
    // 第一个柱子和最后一个柱子不接雨水
    if (i == 0 || i == height.length - 1) continue;

    let rHeight = height[i]; // 记录右边柱子的最高高度
    let lHeight = height[i]; // 记录左边柱子的最高高度
    for (let r = i + 1; r < height.length; r++) {
      if (height[r] > rHeight) rHeight = height[r];
    }
    for (let l = i - 1; l >= 0; l--) {
      if (height[l] > lHeight) lHeight = height[l];
    }
    const h = Math.min(lHeight, rHeight) - height[i];
    if (h > 0) sum += h;
  }
  return sum;
}

// 在暴力法基础上优化而来
// 增加了左右两个指针数组，分别储存
function trapDoublePointer(height: number[]): number {
  if (height.length <= 2) return 0;
  const leftMaxHeight = new Array(height.length).fill(0);
  const rightMaxHeight = new Array(height.length).fill(0);

  leftMaxHeight[0] = height[0];
  for (let i = 1; i < height.length; i++) {
    leftMaxHeight[i] = Math.max(height[i], leftMaxHeight[i - 1]);
  }
  rightMaxHeight[height.length - 1] = height[height.length - 1];
  for (let i = height.length - 2; i >= 0; i--) {
    rightMaxHeight[i] = Math.max(height[i], rightMaxHeight[i + 1]);
  }
  let sum = 0;
  for (let i = 0; i < height.length; i++) {
    const h = Math.min(leftMaxHeight[i], rightMaxHeight[i]) - height[i];
    if (h > 0) sum += h;
  }
  return sum;
}
/**
 * 思路是通过累计计算水平的积水块，上面的几个解题方法累计计算竖直的积水块
 * 本地就不需要找左右最高的，而是只要找到左右比当前高的，能形成一个 W x realativeHeight 的水平积水区就形
 *
 * 所以就可以使用类似每日温度的单调栈思路找到第一个比当前高的位置
 * - 区别点在于需要，注意左侧也比当前高的位置
 *   - 这个会影响入栈逻辑(相同高度的就需要替换当前入栈顶元素, 因为相同高度说明两个位置共享了积水区)
 *     - 因为我们需要通过单调栈本身的特点，锁定左边比当前位置高的位置
 *     - 另外相同高度的位置右侧位置的积水区，需要依靠相同位置的最右侧的位置来计算积水，比如 5，5，1，3。1这个位置需要靠第二个 5 来算积水
 **/
function trapMonotonic(height: number[]): number {
  const increaseStack = [0];
  let sum = 0;

  for (let i = 1; i < height.length; i++) {
    while (
      increaseStack.length > 0 &&
      height[i] >= height[increaseStack[increaseStack.length - 1]]
    ) {
      const mid = increaseStack.pop()!;
      if (height[i] > height[mid] && increaseStack.length > 0) {
        const r = i;
        const l = increaseStack[increaseStack.length - 1];
        // 计算能积水的相对高度
        const h = Math.min(height[l], height[r]) - height[mid];
        // r(right) - l(left) - 1 是求中间凹陷部分宽度
        const w = r - l - 1;
        sum += h * w;
      }
    }

    increaseStack.push(i);
  }

  return sum;
}

import { describe, expect, test } from "vitest";

const ways = ["force", "double-pointer", "monotonic"];

describe.for(ways)("[%s] Trapping Rain water", (way) => {
  function trap(height: number[]): number {
    if (way === "force") return trapForce(height);
    if (way === "double-pointer") return trapDoublePointer(height);
    if (way === "monotonic") return trapMonotonic(height);
    throw new Error("Unknown way");
  }

  test("case 1", () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
  });
  test("case 2", () => {
    expect(trap([4, 2, 0, 3, 2, 5])).toBe(9);
  });
});
