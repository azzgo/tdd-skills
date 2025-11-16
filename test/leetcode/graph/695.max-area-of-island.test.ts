// 给你一个大小为 m x n 的二进制矩阵 grid 。
//
// 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
//
// 岛屿的面积是岛上值为 1 的单元格的数目。
//
// 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
//
//
//
// 示例 1：
//
// 输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
// 输出：6
// 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
//
// 示例 2：
//
// 输入：grid = [[0,0,0,0,0,0,0,0]]
// 输出：0

function maxAreaOfIslandDfs(grid: number[][]): number {
  const directions = [
    [0, -1], // top
    [1, 0], // right
    [0, 1], // down
    [-1, 0], // left
  ];
  const visited = Array.from({ length: grid.length }, () =>
    new Array(grid[0].length).fill(false),
  );
  let sumArea = 0;
  const dfs = (x: number, y: number) => {
    const checkOutOfBoundry = (newX: number, newY: number) => {
      return (
        newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length
      );
    };
    visited[x][y] = true;
    sumArea += 1;
    for (const [deltaX, deltaY] of directions) {
      const newX = x + deltaX;
      const newY = y + deltaY;
      if (
        checkOutOfBoundry(newX, newY) ||
        grid[newX][newY] === 0 ||
        visited[newX][newY]
      ) {
        continue;
      }
      dfs(newX, newY);
    }
  };

  let maxArea = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        sumArea = 0;
        dfs(i, j);
        maxArea = Math.max(maxArea, sumArea);
      }
    }
  }

  return maxArea;
}
function maxAreaOfIslandBfs(grid: number[][]): number {
  const directions = [
    [0, -1], // top
    [1, 0], // right
    [0, 1], // down
    [-1, 0], // left
  ];
  const visited = Array.from({ length: grid.length }, () =>
    new Array(grid[0].length).fill(false),
  );
  let sumArea = 0;
  const bfs = (x: number, y: number) => {
    visited[x][y] = true;
    sumArea = 1;

    const checkOutOfBoundry = (newX: number, newY: number) => {
      return (
        newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length
      );
    };
    const queue = [{ x, y }];

    while (queue.length) {
      const cur = queue.pop()!;
      for (const [deltaX, deltaY] of directions) {
        const newX = cur.x + deltaX;
        const newY = cur.y + deltaY;
        if (
          checkOutOfBoundry(newX, newY) ||
          grid[newX][newY] === 0 ||
          visited[newX][newY]
        ) {
          continue;
        }
        visited[newX][newY] = true;
        sumArea += 1;
        queue.push({ x: newX, y: newY });
      }
    }
  };

  let maxArea = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        sumArea = 0;
        bfs(i, j);
        maxArea = Math.max(maxArea, sumArea);
      }
    }
  }

  return maxArea;
}

import { describe, expect, test } from "vitest";

const solutionWay = ["dfs", "bfs"] as const;

type Way = (typeof solutionWay)[number];

function maxAreaOfIsland(grid: number[][], way: Way): number {
  switch (way) {
    case "dfs":
      return maxAreaOfIslandDfs(grid);
    case "bfs":
      return maxAreaOfIslandBfs(grid);
  }
}

describe.for(solutionWay)("Max area of iland", (way) => {
  test("case 1", () => {
    expect(
      maxAreaOfIsland(
        [
          [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
          [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
          [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        ],
        way,
      ),
    ).toEqual(6);
  });
  test("case 2", () => {
    expect(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]], way)).toEqual(0);
  });

  test("case 3", () => {
    expect(
      maxAreaOfIsland(
        [
          [1, 1, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [0, 0, 0, 1, 1],
          [0, 0, 0, 1, 1],
        ],
        way,
      ),
    ).toBe(4);
  });
});
