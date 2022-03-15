/**
 * 实现一个Head工具类型，用于获取数组类型的第一个类型。
 * 
 * 通过infer关键字推导取出数组第一项的类型，H保存该类型，如果泛型T满足约束，返回推导的第一项类型H，否则never，...any[]（或者...infer R）取出剩余数组。
 */

// type Head<T extends Array<any>> = T extends [infer H, ...any[]] ? H : never;
type Head<T extends Array<any>> = T extends [infer H, ...infer R] ? H : never;


// 测试用例
type H0 = Head<[]> // never
type H1 = Head<[1]> // 1
type H2 = Head<[3, 2]> // 3
type H3 = Head<["a", "b", "c"]> // "a"
type H4 = Head<[undefined, "b", "c"]> // undefined
type H5 = Head<[null, "b", "c"]> // null
type H6 = Head<[true, false, false]> // true
 