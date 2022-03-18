/**
 * 实现一个Reverse工具类型，用于对元组类型中元素的位置颠倒，并返回该数组。
 * 元组的第一个元素会变成最后一个，最后一个元素变成第一个。
 * 
 * 采用递归方式，每次递归都把第一项First放在最后，并把递归结果展开。
 */

type Reverse<T extends Array<any>> = T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : [];


// 测试用例
type R0 = Reverse<[]> // []
type R1 = Reverse<[1, 2, 3]> // [3, 2, 1]
type R2 = Reverse<[1, 2, 3, 4, 5]> //  [5, 4, 3, 2, 1]
