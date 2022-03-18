/**
 * 实现Replace工具类型，用于实现字符串类型的替换操作。
 */

/**
 * Replace工具类型实现：
 * 利用extends，配合infer配合字符串模板变量的写法就能提取出指定的子字符串，再将From改为To返回结果即可。
 */
type Replace<
    S extends string,
    From extends string,
    To extends string
> = S extends `${infer H}${From}${infer R}` ? `${H}${To}${R}` : S;

// 测试用例
type ReplaceR0 = Replace<'', '', ''>; // ''
type ReplaceR1 = Replace<'foobar', 'bar', 'foo'>; // "foofoo"
type ReplaceR2 = Replace<'foobarbar', 'bar', 'foo'>; // "foofoobar"


/**
 * ReplaceAll工具类型实现：
 * ReplaceAll工具类型取出子字符串之后利用递归。
 */
type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
> = S extends `${infer H}${From}${infer R}`
    ? `${ReplaceAll<H, From, To>}${To}${Replace<R, From, To>}`
    : S;

// 测试用例
type ReplaceAllR0 = ReplaceAll<'', '', ''> // ''
type ReplaceAllR1 = ReplaceAll<'barfoo', 'bar', 'foo'> // "foofoo"
type ReplaceAllR2 = ReplaceAll<'foobarbar', 'bar', 'foo'> // "foofoofoo"
type ReplaceAllR3 = ReplaceAll<'foobarfoobar', 'ob', 'b'> // "fobarfobar"

