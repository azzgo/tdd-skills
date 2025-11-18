# TDD Skills - 前端框架原理学习 & LeetCode 练习

这个代码仓库是我用来学习前端框架（Vue、React）核心原理和练习 LeetCode 算法的学习项目。

## 项目结构

```
├── src/utils/              # 前端框架原理实现
│   ├── vue-compiler.ts         # Vue 编译器实现
│   ├── vue-renderer.ts         # Vue 渲染器实现
│   ├── vue-reactive-data-proxy-based.ts  # Vue 响应式系统（Proxy 实现）
│   ├── reactify-system-function-based.ts # React 响应式系统实现
│   ├── deepClone.ts           # 深拷贝工具
│   ├── promise.ts             # Promise 相关实现
│   └── utils.ts               # 工具函数
├── test/
│   ├── frameworks-practice/    # 前端框架练习测试
│   └── leetcode/              # LeetCode 算法练习
│       ├── array/             # 数组类算法
│       ├── backtrace/         # 回溯算法
│       ├── binary-tree/       # 二叉树算法
│       ├── dynamic-planning/  # 动态规划
│       ├── graph/             # 图算法
│       ├── greedy/            # 贪心算法
│       ├── hashtable/         # 哈希表
│       ├── link-list/         # 链表算法
│       ├── stack/             # 栈相关算法
│       └── string/            # 字符串算法
```

## 学习内容

### 🚀 前端框架原理
- **Vue 核心概念实现**
  - 编译器：模板解析、AST 生成、代码生成
  - 响应式系统：基于 Proxy 的数据劫持
  - 渲染器：虚拟 DOM 到真实 DOM 的转换

- **React 核心概念实现**
  - 响应式系统：基于函数的状态管理
  - 组件更新机制

### 📚 算法练习
涵盖 LeetCode 主要算法类型：
- 数组、链表、栈等基础数据结构
- 二叉树遍历与操作
- 动态规划（背包问题、回文串等）
- 回溯算法
- 图算法
- 贪心算法
- 字符串处理

## 运行环境

- **Node.js**: 支持 ES 模块
- **TypeScript**: 类型安全开发
- **Vitest**: 测试框架，支持 TDD 开发方式
- **Vite**: 快速构建工具

## 快速开始

```bash
# 安装依赖
npm install

# 运行测试（推荐 TDD 方式学习）
npm test

# 运行特定测试文件
npm test vue-compiler.test.ts

# 监听模式运行测试
npm test --watch
```

## 测试驱动学习

本项目采用 TDD（Test-Driven Development）的方式学习：

1. **阅读测试用例**：了解要实现的功能
2. **编写实现代码**：让测试通过
3. **重构优化**：改进代码质量
4. **理解原理**：通过实现加深对框架原理的理解

## 学习目标

- 深入理解 Vue.js 和 React 的核心原理
- 提高算法和数据结构能力
- 掌握 TDD 开发方式
- 提升 TypeScript 编程技能

## 注意事项

- 所有实现都是为了学习目的，不用于生产环境
- 重点关注核心原理和思想，而非完整功能
- 鼓励通过测试用例理解和验证实现