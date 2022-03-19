/**
 * 实现ConsistsOnlyOf工具类型，用于判断LongString字符串类型是否由0个或多个Substring字符串类型组成。
 * 
 * 思路：
 *  1、首先需要判断是否为空字符串，如果是直接返回true；
 *  2、否则利用模板字符串语法，以及infer从开头一步步的匹配，减治思想。匹配成功则继续递归，直至字符串为空为止。
 */

type ConsistsOnlyOf<
    LongString extends string,
    Substring extends string
> = LongString extends ''
    ? true
    : LongString extends `${Substring}${infer B}`
        ? ConsistsOnlyOf<B, Substring>
        : false;


// 测试用例
type ConsistsOnlyOfC0 = ConsistsOnlyOf<'aaa', 'a'> //=> true
type ConsistsOnlyOfC1 = ConsistsOnlyOf<'ababab', 'ab'> //=> true
type ConsistsOnlyOfC2 = ConsistsOnlyOf<'aBa', 'a'> //=> false
type ConsistsOnlyOfC3 = ConsistsOnlyOf<'', 'a'> //=> true
        
