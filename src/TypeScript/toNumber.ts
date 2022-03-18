/**
 * 实现一个ToNumber工具类型，用于实现把数值字符串类型转换为数值类型。
 * 
 * 在 TypeScript 中没有直接的数字运算，但是可以通过数组长度转字符串再匹配需要字符串转换的字符串。
 *  1、S类型为累加记录，L获取S的数组类型长度；
 *  2、判断${L}是否满足约束T，不满足则，继续添加''空字符串，作为长度累加。
 */

type ToNumber<
    T extends string,
    S extends any[] = [],
    L extends number = S['length']
> = `${L}` extends T ? L : ToNumber<T, [...S, '']>;


// 测试
type ToNumberT0 = ToNumber<"0">; // 0
type ToNumberT1 = ToNumber<"10">; // 10
type ToNumberT2 = ToNumber<"20">; // 20
