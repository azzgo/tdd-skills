// 测试路径别名是否工作正常
import { describe, it, expect } from 'vitest'
import { deepClone } from '@/utils/deepClone'

describe('@别名路径测试', () => {
  it('应该能正确导入 @/utils 下的模块', () => {
    const obj = { a: 1, b: { c: 2 } }
    const cloned = deepClone(obj)
    
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj) // 不是同一个引用
    expect(cloned.b).not.toBe(obj.b) // 深拷贝
  })
})