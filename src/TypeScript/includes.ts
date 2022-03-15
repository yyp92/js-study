/**
 * 实现一个Includes工具类型，用于判断指定的类型E是否包含在T数组类型中。
 * 
 * 这里T[number]可以理解返回T数组元素的类型，比如传入的泛型T为[2, 2, 3, 1]，那么T[number]被解析为：2 | 2 | 3 | 1。
 */

type Includes<T extends any[], U> = U extends T[number] ? true : false;

// 测试用例
type I0 = Includes<[], 1> // false
type I1 = Includes<[2, 2, 3, 1], 2> // true 
type I2 = Includes<[2, 3, 3, 1], 1> // true
 