/**
 * 实现一个Filter工具类型，用于根据类型变量F的值进行类型过滤。
 * 
 * 思路：
 *  1、R为根据类型变量F的值进行类型过滤后的结果；
 *  2、首先利用extends [infer A, ...infer B]来提取数组内的第一项，递归就能拿到全部；
 *  3、之后判断类型的时候转换成元组类型[A] extends [F]能够避免联合类型在条件判断中分发执行的情况。
 */

type Filter<T extends any[], F, R extends any[] = []> = T extends [
    infer A,
    ...infer B
]
    ? [A] extends [F]
        ? Filter<B, F, [...R, A]>
        : Filter<B, F, R>
    : R;
  

// 测试用例
type FilterF0 = Filter<[6, 'lolo', 7, 'semlinker', false], number>; // [6, 7]
type FilterF1 = Filter<["kakuqo", 2, ["ts"], "lolo"], string>; // ["kakuqo", "lolo"]
type FilterF2 = Filter<[0, true, any, "abao"], string>; // [any, "abao"]
type FilterF3 = Filter<[never, number | string, any, "abao"], string>; // [never, any, "abao"]
  