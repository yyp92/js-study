/**
 * 实现StartsWith工具类型，判断字符串字面量类型T是否以给定的字符串字面量类型U开头，并根据判断结果返回布尔值。
 */

/**
 * StartsWith工具类型实现：
 * ${U}${infer Rest}将U放在开头，infer关键字，会自动推导匹配，如果推导的Rest变量类型满足约束则返回true否则返回false。
 */
type StartsWith<
    T extends string,
    U extends string
> = T extends `${U}${infer Rest}` ? true : false;

// 测试用例
type StartsWithS0 = StartsWith<"123", "12">; // true
type StartsWithS1 = StartsWith<"123", "13">; // false
type StartsWithS2 = StartsWith<"123", "1234">; // false


/**
 * EndsWith工具类型实现：
 * ${infer Head}${U}位置调换即可。与去除左边空格右边空格题目类型逻辑。
 */
 type EndsWith<T extends string, U extends string> = T extends `${infer Head}${U}` ? true : false;


 // 测试用例
 type EndsWithE0 = EndsWith<"123", "23">; // true
 type EndsWithE1 = EndsWith<"123", "13">; // false
 type EndsWithE2 = EndsWith<"123", "123">; // true
 
