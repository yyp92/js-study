/**
 * 实现一个IsEqual工具类型，用于比较两个类型是否相等。
 * 
 * 这里需要考虑never类型和联合类型，所以用到元组进行处理比较。
 * IsEqual工具类型，如果[A]约束于[B]且[B]也满足约束于[A]说明他们相等，否则不相等。
 */

type IsEqual<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false

// 测试用例
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }> // true
type E2 = IsEqual<[1], []>; // false
