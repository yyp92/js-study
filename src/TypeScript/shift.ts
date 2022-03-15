/**
 * 实现一个Shift工具类型，用于移除T数组类型中的第一个类型。
 * 
 * ...infer B去除第一项之后的集合，使用变量B保存该类型。如果满足约束，返回剩余参数类型，也就是B。
 */

type Shift<T extends any[]> = T extends [infer A, ...infer B] ? B : [];


// 测试用例
type S0 = Shift<[1, 2, 3]>; // [2, 3]
type S1 = Shift<[string, number, boolean]>; // [number, boolean]
type S2 = Shift<[never]>; // []
 