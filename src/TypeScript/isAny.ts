/**
 * 实现IsAny工具类型，用于判断类型T是否为any类型。
 * 
 * 利用任何类型与any交叉都等于any实现
 * any类型是个 ”黑洞“ 会吞噬除了never类型之外的大多数类型。
 *  type A0 = any & 1 // any
 *  type A1 = any & boolean // any
 *  type A2 = any & never // never
 * 
 * 因此需要前置0 extends 交叉结果 -> 防止交叉结果为never类型的情况处理。
 */

 type IsAny<T> = 0 extends 1 & T ? true : false;

 type IsAnyI0 = IsAny<never>; // false
 type IsAnyI1 = IsAny<unknown>; // false
 type IsAnyI2 = IsAny<any>; // true
 type IsAnyI3 = IsAny<number>; // false
 
 