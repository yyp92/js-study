/**
 * SetOptional
 * 
 */

/**
 * type Foo = {
        a: number;
        b?: string;
        c: boolean;
    }

    // 测试用例
    type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

    // type SomeOptional = {
    // 	a?: number; // 该属性已变成可选的
    // 	b?: string; // 保持不变
    // 	c: boolean; 
    // }
 */

// 指定项变为可选
type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 除了指定项，其他项变为可选
type SetOptionalOmit<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

// 指定项变为必选
type SetRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// 除了指定项，其他项变为必选
type SetRequiredOmit<T, K extends keyof T> = Pick<T, K> & Required<Omit<T, K>>;


// 测试
type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean; 
// }

