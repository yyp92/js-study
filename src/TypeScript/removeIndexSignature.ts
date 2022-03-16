/**
 * 实现一个RemoveIndexSignature工具类型，用于移除已有类型中的索引签名。
 * 
 * 思路：
 *  1、遍历T，利用as断言实现对K的判断过滤；
 *  2、当前的key如果满足string | number直接返回never过滤当前属性；
 *  3、否则拿当前K，当前K值类型为T[K]。
 */

type RemoveIndexSignature<T> = {
    [K in keyof T as string extends K
        ? never
        : number extends K
            ? never
            : K
    ]: T[K];
};


// 测试用例
interface RemoveIndexSignatureFoo {
    [key: string]: any;
    [key: number]: any;

    bar(): void;
}
  
type FooWithOnlyBar = RemoveIndexSignature<RemoveIndexSignatureFoo>; // { bar: () => void; }
