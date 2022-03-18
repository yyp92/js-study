/**
 * 实现AnyOf工具类型，只要数组中任意元素的类型非 Falsy 类型、{}类型或[]类型，则返回true，否则返回false。如果数组为空的话，则返回false。
 * https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy
 * 
 * 思路：
 *  NotEmptyObject工具类型判断是否为空对象{}，如果是直接返回false；
 *  type = Flasy定义属于Falsy的类型；
 *  1、依次取出第一项，通过元组判断是否为Falsy类型（元组避免联合类型分发执行情况），如果当前项First满足Falsy类型则继续递归依次取出元素进行判断，否则再判断是否为空对象，如果是直接返回false，如果不是说明是非 Falsy类型、 {} 类型或 [] 类型。
 */

type NotEmptyObject<T> = T extends {}
    ? ({} extends T
        ? false
        : true
    )
    : true;

type Flasy = 0 | '' | false | [];

type AnyOf<T extends any[]> = T extends [infer First, ...infer Rest]
    ? [First] extends [Flasy]
        ? AnyOf<Rest>
        : NotEmptyObject<First>
    : false;

type AnyOfA0 = AnyOf<[]>; // false
type AnyOfA1 = AnyOf<[0, '', false, [], {}]>; // false
type AnyOfA2 = AnyOf<[1, '', false, [], {}]>; // true
type AnyOfA3 = AnyOf<[0, '' | 2, false, [], {}]>; // true
 