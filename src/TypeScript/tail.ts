/**
 * Tail
 * 
 * 实现一个Tail工具类型，用于获取数组类型除了第一个类型外，剩余的类型。
 */

type Tail<T extends Array<any>> = T extends [infer H, ...infer R] ? R : never;

// 测试用例
type T0 = Tail<[]>; // never
type T3 = Tail<[5]>; // []
type T1 = Tail<[1, 2]>; // [2]
type T2 = Tail<[1, 2, 3, 4, 5]>; // [2, 3, 4, 5]
 