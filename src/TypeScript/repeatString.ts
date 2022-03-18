/**
 * 实现一个RepeatString工具类型，用于根据类型变量C的值，重复T类型并以字符串的形式返回新的类型。
 * 
 * 多添加了一个返回最终的结果的S类型，A记录添加的数量。
 */

type RepeatString<
    T extends string,
    C extends number,
    A extends any[] = [],
    S extends string = ''
> = A['length'] extends C ? S : RepeatString<T, C, [...A, T], `${S}${T}`>;


// 测试用例
type RS0 = RepeatString<"a", 0>; // ''
type RS1 = RepeatString<"a", 2>; // 'aa'
type RS2 = RepeatString<"ab", 3>; // 'ababab'
