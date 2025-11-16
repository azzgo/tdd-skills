// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
//
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
//
// 此外，你可以假设该网格的四条边均被水包围。
//
//
//
// 示例 1：
//
// 输入：grid = [
//   ['1','1','1','1','0'],
//   ['1','1','0','1','0'],
//   ['1','1','0','0','0'],
//   ['0','0','0','0','0']
// ]
// 输出：1
//
// 示例 2：
//
// 输入：grid = [
//   ['1','1','0','0','0'],
//   ['1','1','0','0','0'],
//   ['0','0','1','0','0'],
//   ['0','0','0','1','1']
// ]
// 输出：3
//
//
//
// 提示：
//
//     m == grid.length
//     n == grid[i].length
//     1 <= m, n <= 300
//     grid[i][j] 的值为 '0' 或 '1'

const solutionWay = ["dfs", "bfs"] as const;

type Way = (typeof solutionWay)[number];

/**
 * 思路遍历的时候找到一片陆地，将所有与之关联的节点标记为已访问(搜索算法)，结果 +1
 **/
function numIslandsDfs(grid: string[][]): number {
  const directions = [
    [0, -1], // top
    [1, 0], // right
    [0, 1], // down
    [-1, 0], // left
  ];
  const visited = Array.from({ length: grid.length }, () =>
    new Array(grid[0].length).fill(false),
  );
  const dfs = (x: number, y: number) => {
    const checkOutOfBoundry = (newX: number, newY: number) => {
      return (
        newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length
      );
    };
    for (const [deltaX, deltaY] of directions) {
      const newX = x + deltaX;
      const newY = y + deltaY;
      if (
        checkOutOfBoundry(newX, newY) ||
        grid[newX][newY] === "0" ||
        visited[newX][newY]
      ) {
        continue;
      }
      visited[newX][newY] = true;
      dfs(newX, newY);
    }
  };

  let result = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === "1") {
        visited[i][j] = true;
        result += 1;
        dfs(i, j);
      }
    }
  }

  return result;
}

function numIslandsBfs(grid: string[][]): number {
  const directions = [
    [0, -1], // top
    [1, 0], // right
    [0, 1], // down
    [-1, 0], // left
  ];
  const visited = Array.from({ length: grid.length }, () =>
    new Array(grid[0].length).fill(false),
  );

  const bfs = (x: number, y: number) => {
    const queue = [{ x, y }];
    const checkOutOfBoundry = (newX: number, newY: number) => {
      return (
        newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length
      );
    };
    while (queue.length) {
      const cur = queue.shift()!;
      for (const [deltaX, deltaY] of directions) {
        const newX = cur.x + deltaX;
        const newY = cur.y + deltaY;
        if (
          checkOutOfBoundry(newX, newY) ||
          grid[newX][newY] === "0" ||
          visited[newX][newY]
        ) {
          continue;
        }
        // 入列前需要标记已访问，避免后续重复将节点假如队列
        visited[newX][newY] = true;
        queue.push({ x: newX, y: newY });
      }
    }
  };

  let result = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === "1") {
        visited[i][j] = true;
        result += 1;
        bfs(i, j);
      }
    }
  }

  return result;
}
function numIslands(grid: string[][], way: Way): number {
  switch (way) {
    case "dfs":
      return numIslandsDfs(grid);
    case "bfs":
      return numIslandsBfs(grid);
  }
}

import { describe, expect, test } from "vitest";

describe.for(solutionWay)("Number of islands", (way) => {
  test("示例1：单一大岛屿", () => {
    const grid = [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ];
    expect(numIslands(grid, way)).toBe(1);
  });

  test("示例2：多个分离岛屿", () => {
    const grid = [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ];
    expect(numIslands(grid, way)).toBe(3);
  });

  test("全是水域", () => {
    const grid = [
      ["0", "0", "0"],
      ["0", "0", "0"],
    ];
    expect(numIslands(grid, way)).toBe(0);
  });

  test("全是陆地", () => {
    const grid = [
      ["1", "1"],
      ["1", "1"],
    ];
    expect(numIslands(grid, way)).toBe(1);
  });

  test("单行多岛屿", () => {
    const grid = [["1", "0", "1", "0", "1"]];
    expect(numIslands(grid, way)).toBe(3);
  });

  test("单列多岛屿", () => {
    const grid = [["1"], ["0"], ["1"], ["1"], ["0"]];
    expect(numIslands(grid, way)).toBe(2);
  });

  test("空网格", () => {
    const grid: string[][] = [];
    expect(numIslands(grid, way)).toBe(0);
  });
});
