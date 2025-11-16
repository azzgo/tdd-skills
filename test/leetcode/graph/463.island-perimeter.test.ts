// 给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。
//
// 网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。
//
// 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。
//
//
//
// 示例 1：
//
// 输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
// 输出：16
// 解释：它的周长是上面图片中的 16 个黄色的边
//
// 示例 2：
//
// 输入：grid = [[1]]
// 输出：4
//
// 示例 3：
//
// 输入：grid = [[1,0]]
// 输出：4

// 这道题用迭代模拟把岛屿块和边数好就形，不需要引入搜索算法
function islandPerimeter(grid: number[][]): number {
  let islandblocks = 0;
  let overlaps = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        islandblocks++;
        if (i + 1 < grid.length && grid[i + 1][j] === 1) {
          overlaps++;
        }
        if (j + 1 < grid[i].length && grid[i][j + 1] === 1) {
          overlaps++;
        }
      }
    }
  }

  return islandblocks * 4 - overlaps * 2;
}

import { describe, expect, test } from "vitest";

describe("island perimeter", () => {
  test("case 1", () => {
    expect(
      islandPerimeter([
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
      ]),
    ).toBe(16);
  });
  test("case 2", () => {
    expect(islandPerimeter([[1]])).toBe(4);
  });

  test("case 3", () => {
    expect(islandPerimeter([[1, 0]])).toBe(4);
  });

  test("case 4", () => {
    expect(islandPerimeter([[1, 1]])).toBe(6);
  });
});
