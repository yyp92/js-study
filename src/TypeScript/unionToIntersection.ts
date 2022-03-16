/**
 * 实现一个UnionToIntersection工具类型，用于把联合类型转换为交叉类型。
 * 有条件类型中的类型推断: https://www.tslang.cn/docs/release-notes/typescript-2.8.html
 * 协变和逆变: https://juejin.cn/post/6844904169921314829
 * 
 * 1、extends unknown始终为true，默认进入到分发情况
 * 2、会声明一个以Union为入参类型的函数类型A，即(distributedUnion: Union) => void，该函数约束于以mergedIntersection类型为入参的函数类型B，即(mergedIntersection: infer Intersection) => void。
 * 3、如果函数A能继承函数B则 返回infer Intersection声明的Intersection，否则返回never，再利用函数参数类型逆变，从而实现得到的结果从联合类型到交叉类型的转变。
 * 
 * 这里是也设计到一个知识点：**分布式条件类型，
 * **条件类型的特性：分布式条件类型。
 *  在结合联合类型使用时（只针对extends左边的联合类型），分布式条件类型会被自动分发成联合类型。例如，T extends U ? X : Y，T的类型为A | B | C，会被解析为(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)。
 * 
 * 
 * 在ts中，参数类型是双变的，也就是说既是协变，也是逆变。
 */

/**
 * 协变和逆变
 * 当f()是协变时：若 A -> B，则f(A) -> f(B)
 * 当f()是逆变时：若 A -> B，则f(B) -> f(A)
 * 当f()是双变时：若 A -> B，则以上均成立
 * 当f()是不变时：若 A -> B，则以上均不成立，没有兼容关系
 * 
 * A: (param: Cat) => void
 * B: (param: WhiteCat) => void
 * C: (param: Animal) => void
 * 
 * A = C;
 * C: (param: Animal) => void -> A: (param: Cat) => void
 * 
 * 
 * 对象型类型都可当做是协变类型。
 */

type UnionToIntersection<Union> = (
    Union extends unknown ? (distributedUnion: Union) => void : never
) extends (mergedIntersection: infer Intersection) => void
    ? Intersection
    : never;


// 测试用例
type U0 = UnionToIntersection<string | number> // never
type U1 = UnionToIntersection<{ name: string } | { age: number }> // { name: string; } & { age: number; }


/**
 * 都知道infer声明都是只能出现在extends子语句中。但是，在协变的位置上，同一类型变量的多个候选类型会被推断为联合类型：
 */
 type UnionFoo<T> = T extends { a: infer U, b: infer U } ? U : never;
 type T10 = UnionFoo<{ a: string, b: string }>;  // string
 type T11 = UnionFoo<{ a: string, b: number }>;  // string | number


/**
 * 在逆变的位置上，同一个类型多个候选类型会被推断为交叉类型：
 * https://juejin.cn/post/6926812947050135565
 */
type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number 其实就是 never



 
 
  