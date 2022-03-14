/**
 * AppendArgument
 * 
 * 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是x，将作为新函数类型的第一个参数。
 */

// 使用 Parameters+ ReturnType工具类型实现：
type AppendArgument<F extends (...args: any) => any, T> = (
    x: T,
    ...args: Parameters<F>
) => ReturnType<F>;

// 使用infer方式
// type AppendArgument<F extends (...args: any) => any, T> = F extends (
//     ...args: infer P
//   ) => infer Return
//     ? (x: T, ...args: P) => Return
//     : never;

// 测试
type Fn = (a: number, b: string) => number
type FinalFn = AppendArgument<Fn, boolean> 
// (x: boolean, a: number, b: string) => number
