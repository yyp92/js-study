/**
 * 完善Chainable类型的定义，使得 TS 能成功推断出result变量的类型。
 * 调用option方法之后会不断扩展当前对象的类型，使得调用get方法后能获取正确的类型。
 * 
 * 思路：
 * config可以进行链式调用，可以联想到 js 中return this这种思路，所以这里opiton的返回值就应该是一个新的Chainable，把添加的属性类型当做下一个Chainable的T。
 *  1、Chainable类型定义中的option返回值类型为新的Chainable，将添加的属性当做下一个Chainable的T；
 *  2、get类型直接就返回Chainable中的T。
 */

declare const config: Chainable;

type Simplify<T> = {
    [P in keyof T]: T[P];
};

type Chainable<T = {}> = {
    option<V, S extends string>(
        key: S,
        value: V
    ): Chainable<
        T & {
            [P in keyof { S: S } as `${S}`]: V;
        }
    >;
    get(): Simplify<T>;
};


// 测试
const result = config
.option('age', 7)
.option('address', { name: 'Leslie' })
.get();
type ResultType = typeof result;
// => {
//   age: number;
//   address: {
//       name: string;
//   };
// }
 