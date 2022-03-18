/**
 * 实现一个Split工具类型，根据给定的分隔符（Delimiter）对包含分隔符的字符串进行切割。
 * 可用于定义 String.prototype.split方法的返回值类型。
 * 
 * 思路：
 *  1、${infer Head}${Delimiter}${infer Tail}映射类型在模板变量中使用，将一个字符串做拆解;
 *  2、第一步会变成${infer "semlinker"}${,}${infer "lolo,kakuqo"}，减治思想，再递归依次取第二位，直至递归到Delimiter符号的最后一项，S extends Delimiter处理Delimiter为空格的情况。
 */

type Item = 'semlinker,lolo,kakuqo';

export type Split<
    S extends string,
    Delimiter extends string
 > = S extends `${infer Head}${Delimiter}${infer Tail}`
    ? [Head, ...Split<Tail, Delimiter>]
    : S extends Delimiter
        ? []
        : [S];


// 测试用例
type ElementType = Split<Item, ','>; // ["semlinker", "lolo", "kakuqo"]
type ElementType2 = Split<'a|b|c||d', '|'>; // ["a", "b", "c", "", "d"]
type ElementType3 = Split<'abcdef', ''>; // ["a", "b", "c", "d", "e", "f"]
type ElementType4 = Split<'abcdef', '|'>; // ["abcdef"]
type ElementType5 = Split<'', ''>; // []
 