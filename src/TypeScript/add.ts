/**
 * 实现一个Add工具类型，用于实现对数值类型对应的数值进行加法运算。
 * 
 * GenArr工具类型通过数值构建对应长度数组。
 */

type GenArr<N extends number, S extends any[] = []> = S['length'] extends N
    ? S
    : GenArr<N, [...S, '']>;

type Add<N extends number, M extends number> = [
    ...GenArr<N>,
    ...GenArr<M>
]['length'];


// 测试用例
type Add1 = Add<1, 2>; // 3
type Add2 = Add<100, 2>; // 102
