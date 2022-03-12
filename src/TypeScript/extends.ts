/**
 * extends关键字
 * ts关键字：https://juejin.cn/post/6844904131975446536
 * https://juejin.cn/post/6998736350841143326
 * 
 * 用途：
 *  1.用于类型的继承 -> interface Player extends Person {}
 *  2.判断是否是能赋值给另一个类型 
 *      -> type IsPerson<T> = T extends Person ? Person : T; 
 *      -> 如果 T 可以满足类型 Person 则返回 Person 类型，否则为 T 类型
 * 		-> 如果extends前面的类型能够赋值给extends后面的类型，那么表达式判断为真，否则为假。
 * 		-> 对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。
 * 		-> 总之，满足两个要点即可适用分配律：第一，参数是泛型类型，第二，代入参数的是联合类型
 * 		-> 实际上，这里还是条件分配类型在起作用。never被认为是空的联合类型，也就是说，没有联合项的联合类型，所以还是满足上面的分配律，然而因为没有联合项可以分配，所以P<T>的表达式其实根本就没有执行，所以A2的定义也就类似于永远没有返回的函数一样，是never类型的。
 * 
 * 
 * 其他知识点
 * void 表示没有任何类型，never 表示永远不存在的值的类型。
 * keyof 是TS中的索引类型查询操作符。keyof T 会得到由 T 上已知的公共属性名组成的联合类型。
 */


// 题目
type User = {
    id: number;
    kind: string;
}; 
// function makeCustomer<T extends User>(u: T): T {
//     // Error（TS 编译器版本：v4.4.2）
//     // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
//     // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
//     // but 'T' could be instantiated with a different subtype of constraint 'User'.
//     return {
//         id: u.id,
//         kind: 'customer'
//     }
// }

/**
 * 1、ReturnMake工具类型，接收 T，U 两个泛型， T 约束于 User，
 * 2、遍历 User 中的 key ，并使用 as 断言，如果K（也就是 User 类型的 key），约束于 泛型类型的 key 就返回 K，否侧返回 never，U[K] 取键值。
 */
// 方法1
// function makeCustomer<T extends User>(u: T): T {
// 	return {
//         ...u,
// 		id: u.id,
// 		kind: 'customer',
// 	};
// }

// 方法2
type ReturnMake<T extends User, U> = {
	[K in keyof U as K extends keyof T ? K : never]: U[K];
};

function makeCustomer<T extends User>(u: T): ReturnMake<T, User> {
	return {
		id: u.id,
		kind: 'customer',
	};
}

// 测试
makeCustomer({ id: 18584132, kind: '888', price: 99 });

