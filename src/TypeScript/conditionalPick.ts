/**
 * 根据指定的value值筛选出符合条件的值
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

      

