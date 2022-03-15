/**
 * 定义NonEmptyArray工具类型，用于确保数据非空数组。
 * 
 * [T, ...T[]]确保第一项一定是T，[...T[]]，为剩余数组类型。
 */

type NonEmptyArray<T> = [T, ...T[]];

// 测试
// const a: NonEmptyArray<string> = [] // Error
const b: NonEmptyArray<string> = ['Hello TS'] // OK

