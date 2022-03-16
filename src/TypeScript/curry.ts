/**
 * 实现一个Curry工具类型，用来实现函数类型的柯里化处理。
 * 
 * F为需要柯里化的函数类型；
 * P通过Paramters获取F参数集合；
 * R通过ReturnType获取F函数类型返回值；
 * 
 * 逻辑分析：
 *  1、需要先拿到args数组的第一项和剩余参数集合，[infer A, ...infer B]；
 *  2、使用 extends 判断P是否满足于[infer A, ...infer B]，不满足直接返回() => R,说明没有参数；
 *  3、如果有一个或者多个参数，这里则继续递归；
 *  4、首先...infer B需要判断是否约束与[]来做终止条件；
 *  5、满足约束直接返回(args: A) => R；
 *  6、否则递归，创建一个函数，并且参数类型为A，返回值则为Curry<(...args: B) => R>，新函数入参B，为剩余参数类型集合，它的返回值确保最后一个返回因此保留为R即(arg: A) => Curry<(...args: B) => R>。
 */

type Curry<
 F extends (...args: any[]) => any,
 P extends any[] = Parameters<F>,
 R = ReturnType<F>
> = P extends [infer A, ...infer B]
 ? B extends []
   ? (arg: A) => R
   : (arg: A) => Curry<(...args: B) => R>
 : () => R;


// 测试用例
type F0 = Curry<() => Date>; // () => Date
type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date>; //  (arg: number) => (arg: string) => Date
