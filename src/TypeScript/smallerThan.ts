/**
 * 实现一个SmallerThan工具类型，用于比较数值类型的大小。
 * 
 * 这里利用构造数组的长度来判断，默认是一个空数组进行递增，哪个先匹配上说明哪个小。
 * 例如给N, M传入 0, 0
 *  1、默认从空数组进行递增，第一遍A['length']数组的长度为0，0 extends 0为true，也就是，当M为0，说明要么M===N，要么就N > M，因此返回**false**。
 * 
 * 再例如给N, M传入1, 2：
 *  1、第一遍我们直接跳过，会走到递归，第二遍得到A['length'] = 1；
 *  2、第二遍：1 extends 2不约束说明M >= N，走到否则1 extends 1满足约束说明M > N，最后得到结果为**true**。
 */

type SmallerThan<
    N extends number,
    M extends number,
    A extends any[] = []
> = A['length'] extends M  //=> M = 0 直接返回 false  1 => extends 2 ? false
    ? false
    : A['length'] extends N // => if M = 1，那么 N 应该就是 0， so M > N => 1 extends 1 true 
        ? true
        : SmallerThan<N, M, [...A, '']>; // 否则 A length + 1 

// 测试用例
type ST1 = SmallerThan<0, 0> // false
type ST2 = SmallerThan<1, 2>; // true
