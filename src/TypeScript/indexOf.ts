/**
 * 实现IndexOf工具类型，用于获取数组类型中指定项的索引值。若不存在的话，则返回-1字面量类型。
 * 
 * 构建数组来记录迭代到了哪一项，这样匹配到之后就能返回长度，就是索引值。
 *  1、依次取数组的第一项与Item指定的值比较是否相等，找到就返回记录索引值的L数组；
 *  2、找不到则继续增加L数组长度；
 *  3、如果A extends [infer F, ...infer R]数组取完了，没有找到，直接返回-1。
 */

type IndexOf<A extends any[], Item, L extends any[] = []> = A extends [
    infer F,
    ...infer R
]
    ? F extends Item
        ? L['length']
        : IndexOf<R, Item, [...L, 1]>
    : -1;

    
// 测试
type Arr = [1, 2, 3, 4, 5]
type IndexOfI0 = IndexOf<Arr, 0> // -1
type IndexOfI1 = IndexOf<Arr, 1> // 0
type IndexOfI2 = IndexOf<Arr, 3> // 2
  