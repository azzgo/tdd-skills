// 求最大递增子序列索引
export const listToSequence = (list: number[]): string => {
  const n = list.length;
  if (n === 0) return [];

  const dp = Array(n).fill(1); // Length of LIS ending at i
  const prev = Array(n).fill(-1); // Previous index in LIS

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (list[j] < list[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
  }

  // Find the index of the maximum value in dp
  let maxIdx = 0;
  for (let i = 1; i < n; i++) {
    if (dp[i] > dp[maxIdx]) maxIdx = i;
  }

  // Backtrack to get the indices
  const indices: number[] = [];
  let curr = maxIdx;
  while (curr !== -1) {
    indices.push(curr);
    curr = prev[curr];
  }
  indices.reverse();

  return indices;
};
