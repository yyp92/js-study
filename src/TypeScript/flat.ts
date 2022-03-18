/**
 * 实现一个Flat工具类型，支持把数组类型拍平（扁平化）。
 * 
 * 思路：
 *  1、[infer First, ...infer Rest]提取数组第一项
 *  2、如果T为多项，第一项First判断是否还是数组，扁平多维数组情况，如果是，继续递归将Frist扁平，以及递归将Rest也扁平，否则First不是多为数组，递归Rest并扁平。
 *  3、如果空数组，直接返回[]。
 */

type Flat<T extends any[]> = T extends [infer First, ...infer Rest]
    ? First extends any[]
        ? [...Flat<First>, ...Flat<Rest>]
        : [First, ...Flat<Rest>]
    : [];


//测试用例 
type FlatF1 = Flat<[[1, 2, 3, 4, [5]], 6]>; // [1,2,3,4,5,6]
type FlatF2 = Flat<['a', ['b', 'c'], ['d', ['e', ['f']]]]> // ["a", "b", "c", "d", "e", "f"]
type FlatF3 = Flat<[]> // []


