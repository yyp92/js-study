/**
 * 实现一个Mutable工具类型，用于移除对象类型上所有属性或部分属性的readonly修饰符。
 * 
 * 思路：
 *  1、遍历Keys，-readonly删除只读符号；
 *  2、Omit<T, Keys>返回删除在T中的Keys属性的新类型，最后与前面的结果组成交叉类型。
 */

type Mutable<T, Keys extends keyof T = keyof T> = {
    -readonly [K in Keys]: T[K];
} & Omit<T, Keys>;



// 测试用例
type MutableFoo = {
    readonly a: number;
    readonly b: string;
    readonly c: boolean;
};
const mutableFoo: Mutable<MutableFoo, 'a'> = { a: 1, b: '2', c: true };
mutableFoo.a = 3; // OK
// mutableFoo.b = '6'; // Cannot assign to 'b' because it is a read-only property.
  