/**
 * 实现一个ToPath工具类型，用于把属性访问（.或 []）路径转换为元组的形式。
 * 
 * 思路：
 *  1、IndexSignature工具类型处理以.为拆分，并递归将每一项的子项放入到元组中；
 *  2、IndexSignature处理比如完foo[0][1]会得到=>``["foo", "0", "", "1"]；
 *  3、NonSpace处理IndexSignature工具类型返回值数组中的空字符串；
 *  4、ToPath以分隔符.拆分字符串，多项则拼接并递归，否则直接处理并返回。
 */

// 以 . 拆分，处理每一项
type IndexSignature<T> = T extends `${infer H}[${infer M}][${infer R}]`
    ? [H, M, ...IndexSignature<`[${R}]`>]
    : T extends `${infer F}[${infer L}]`
        ? [F, L]
        : [T];
// type test = IndexSignature<'[3]'>

// 验证数组是否有 ''
type NonSpace<T extends string[]> = T extends [infer H, ...infer R]
    ? R extends string[]
        ? H extends ''
            ? [...NonSpace<R>]
            : [H, ...NonSpace<R>]
        : never
    : T;

// NonSpace 和 IndexSignature 组合起来
type ToPath<S extends string> = S extends `${infer H}.${infer R}`
    ? [...NonSpace<IndexSignature<H>>, ...ToPath<R>]
    : NonSpace<IndexSignature<S>>;

// type ToPath<S extends string> = S extends `${infer H}.${infer R}`
//     ? [...IndexSignature<H>, ...ToPath<R>]
//     : IndexSignature<S>;


// 测试用例
type TT0 = ToPath<'foo.bar.baz'> // => ['foo', 'bar', 'baz']  
type TT1 = ToPath<'foo[0].bar[0][1][2][3].car'>; // => ["foo", "0", "bar", "0", "1", "2", "3", "car"]
type TT2 = ToPath<'foo'> // => ['foo']  
