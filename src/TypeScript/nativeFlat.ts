/**
 * NativeFlat
 * 定义一个NativeFlat工具类型，支持把数组类型拍平（扁平化）
 * 
 * T[number][number]可以理解为 => T[][]一个二维数组的类型表达式，类型[number]在 TypeScript 中，可以代表取数组的中值作为 key, number是数组下标。
 *
 */

// 使用递归写法：
type NaiveFlat<T extends any[]> = T extends (infer P)[] ? P extends any[] ? NaiveFlat<P> : P : never;


// 测试
type NaiveResult = NaiveFlat<[['a'], [['b', 'c']], ['d']]>;
// type NaiveResult = "a" | "b" | "c" | "d"
