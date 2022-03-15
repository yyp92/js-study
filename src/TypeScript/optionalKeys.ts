/**
 * 实现一个OptionalKeys工具类型，用来获取对象类型中声明的可选属性。
 * https://zhuanlan.zhihu.com/p/43206436
 * 
 * 1、首先会遍历所有Person属性，-?字符的作用是，再完成边extends判断后将T中所有的属性都变成必须属性，为防止属性值类型undefined；
 * 2、右边，判断undefined是否约束于当前键值，如果满足约束当前属性的类型为键名。
 * 在 TypeScript 中，如果添加了可选属性，会被隐式添加一个 undefined类型，比如from?其实是string | undefined
 * 3、{ ... }[keyof T]取键值，因为id,age,name的属性类型都为never，取值的时候会被忽略掉，因为never是一个用不存在的类型，因此就只剩下from、speak属性的值了就是 "from" | "speak"组成联合类型返回。
 */

// 严格模式
// type OptionalKeys<T> = {
//     [P in keyof T]-?: undefined extends T[P] ? P : never
// }[keyof T];

// 非严格模式
/**
 * 判断一个属性是不是可选的，这里的思路是：
 *  存在一个可能拥有可选属性的对象类型 A。
 *  把这个对象的所有属性改变为必选成为一个新的类型 B，B 是 A 的子类型（这一步只是这个方法的副作用，可以不用关心）。
 *  把 B 的其中一个属性 c 改为可选。
 *  如果 A 中的 c 属性为可选属性，那么 B 是 A 的子类型。
 *  如果 A 中的 c 属性为必选属性，那么 B 不是 A 的子类型。
 */
type IsOptional<T, K extends keyof T> = {
    [K1 in Exclude<keyof T, K>]: T[K1]
} & { K?: T[K]} extends T ? K : never

type OptionalKeys<T> = { [K in keyof T]: IsOptional<T, K> }[keyof T]


// 测试用例
type Person = {
    id: string;
    name: string;
    age: number;
    from?: string;
    speak?: string;
};
type PersonOptionalKeys = OptionalKeys<Person>; // "from" | "speak"
  