/**
 * 实现一个Push工具类型，用于把指定类型E作为第最后一个元素添加到T数组类型中。
 */

type Push<T extends any[], V> = [...T, V];

// 测试用例
type ArrPush0 = Push<[], 1> // [1]
type ArrPush1 = Push<[1, 2, 3], 4> // [1, 2, 3, 4]
 