/**
 * 实现一个Unshift工具类型，用于把指定类型E作为第一个元素添加到 T 数组类型中。
 * 
 * 新建一个数组，第一项类型为E，剩余使用...T连接。
 */

type Unshift<T extends any[], E> = [E, ...T];

// 测试用例
type Arr0 = Unshift<[], never>; // [never]
type Arr1 = Unshift<[], 1>; // [1]
type Arr2 = Unshift<[1, 2, 3], 0>; // [0, 1, 2, 3]
 