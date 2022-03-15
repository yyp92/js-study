/**
 * 实现一个Trim工具类型，用于对字符串字面量类型进行去空格处理。
 * 
 * 利用ts模板字符串，配合infer去除空格。
 * 需要定义两个工具类型方法，Trim分解成TrimLeft 和 TrimRight，一个是去除左边空格的，另一个去除右边。
 * 去除空格主要通过extends配合infer在模板字符串中使用，并且，如果去除左边空格，需要在左边添加一个空格（ ${infer R}**），**之后就是映射类型可以递归。
 */

type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;
type Trim<V extends string> = TrimLeft<TrimRight<V>>;


// 测试用例
type Result = Trim<'  semlinker '>
 //=> 'semlinker'
 