/**
 * 根据指定的value值筛选出符合条件的值
 * 
 * 1、in keyof遍历 V 泛型；
 * 2、通过类型断言判断 V[K] 对应键值是否约束于传入的 string如果是 true 那么断言成返回遍历的当前 K，否则为 never。
返回 never 在 TypeScript 编译器中，会默认认为这是个用不存在的类型，也相当于没有这个 K 会被过滤，对应值则是 V[K] 获取。
 * 
 * interface Example {
        a: string;
        b: string | number;
        c: () => void;
        d: {};
    }

    // 测试用例：
    type StringKeysOnly = ConditionalPick<Example, string>;
    //=> {a: string}
 */

type ConditionalPick<V, T> = {
    [K in keyof V as V[K] extends T ? K : never]: V[K];
};

interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
    // e: string
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
// => {a: string}

      

