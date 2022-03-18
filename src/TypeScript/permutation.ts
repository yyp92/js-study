/**
 * 实现一个Permutation工具类型，当输入一个联合类型时，返回一个包含该联合类型的全排列类型数组。
 * 
 * 直接用传入'a' | 'b' | 'c'为例子说明：
 * 这里简化 Exclude 后的结果
 *  1、['a', ...Permutation<'b' | 'c'>] | ['b', ...Permutation<'a' | 'c'>] | ['c', ...Permutation<'a' | 'b'>]
 * 
 *  2、=> ...Permutation<'b' | 'c'> 递归做再次分发后
 *   => ['b', ...Permutation<'c'>] | ['c', ...Permutation<'b'>]
 *   => ['b', 'c'] | ['c', 'b']
 * 
 *  3、再与 1 结合也就是 （...会将结果展开）=> ['a', 'b', 'c']  |  ['a', 'c', 'b']                             
 *  再反复上面的 1 2 3 步骤得到最终结果
 *  => type P1 = ["a", "b", "c"] | ["a", "c", "b"] | ["b", "a", "c"] | ["b", "c", "a"] |["c", "a", "b"] | ["c", "b", "a"]
 */

type Permutation<T, K = T> = [T] extends [never]
    ? []
    : K extends K
        ? [K, ...Permutation<Exclude<T, K>>]
        : never;


// 测试       
type PermutationP0 = Permutation<'a' | 'b'>; // ['a', 'b'] | ['b', 'a']
type PermutationP1 = Permutation<'a' | 'b' | 'c'>; 
// => ["a", "b", "c"] | ["a", "c", "b"] | ["b", "a", "c"] | ["b", "c", "a"] 
// |["c", "a", "b"] | ["c", "b", "a"]
