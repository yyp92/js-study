/**
 * 实现Unpacked工具类型，用于对类型执行 “拆箱” 操作。
 * 
 * 思路：
 *  1、(infer U)[]处理数组类型，并返回数组类型的具体类型；
 *  2、(...args: any[]) => infer U处理函数类型，推断拿到函数的返回类型；
 *  3、Promise<infer U>处理Promise类型，这里嵌套调用返回；
 *  4、否则都不是上面三种类型其中一种，直接返回本身类型。
 */

type Unpacked<T> = T extends (infer U)[]
    ? U
    : T extends (...args: any[]) => infer U
        ? U
        : T extends Promise<infer U>
            ? U
            : T;


 // 测试用例
type UnpackedT00 = Unpacked<string>;  // string
type UnpackedT01 = Unpacked<string[]>;  // string
type UnpackedT02 = Unpacked<() => string>;  // string
type UnpackedT03 = Unpacked<Promise<string>>;  // string
type UnpackedT04 = Unpacked<Unpacked<Promise<string>[]>>;  // string
type UnpackedT05 = Unpacked<any>;  // any
type UnpackedT06 = Unpacked<never>;  // never
