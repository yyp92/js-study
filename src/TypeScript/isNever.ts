/**
 * 实现一个IsNever工具类型，判断指定的类型是否为never类型。
 */

type IsNever<T> = [T] extends [never] ? true : false;

// 测试用例
type II0 = IsNever<never> // true
type II1 = IsNever<never | string> // false
type II2 = IsNever<null> // false
type II3 = IsNever<{}> // false
type II4 = IsNever<[]> // false
type II5 = IsNever<[] | never> // false
 