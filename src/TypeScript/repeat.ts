/**
 * 实现一个Repeat工具类型，用于根据类型变量C的值，重复T类型并以元组的形式返回新的类型。
 * 
 * 思路：
 *  1、A为接收根据C数量，重复T类型以元组形式返回的新类型；
 *  2、判断A的数组长度是否满足C；
 *  3、不满足则继续往里面添加需要重复的T类型；
 *  4、否则返回添加完成的A类型结果。
 */

type Repeat<T, C extends number, A extends any[] = []> = A['length'] extends C
    ? A
    : Repeat<T, C, [...A, T]>;


// 测试用例
type RepeatR0 = Repeat<0, 0>; // []
type RepeatR1 = Repeat<1, 1>; // [1]
type RepeatR2 = Repeat<number, 2>; // [number, number]
