/**
 * EmptyObject
 * 使用类型别名定义一个EmptyObject类型，使得该类型只允许空对象赋值
 * 
 * EmptyObject类型中[K in keyof any] 等同于[K in string | number | symbol]，将所有对象属性对应类型设置为never。
 * 对象的索引类型是string | number | symbol
 */

type EmptyObject = {
    [K in keyof any]: never;
};

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
// const shouldFail: EmptyObject = { // 将出现编译错误
//     prop: "TS"
// }


// takeSomeTypeOnly函数的类型定义 让它的参数只允许严格SomeType类型的值。
type Exclusive<T1, T2> = {
    [K in keyof T1]: K extends keyof T2 ? T1[K] : never;
};
type SomeType = {
    prop: string
}
function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) {
    return x;
}
  
takeSomeTypeOnly({ prop: 'a' }); // OK
// takeSomeTypeOnly({ prop: 'a', addditionalProp: 'x' }) // 将出现编译错误
  
  