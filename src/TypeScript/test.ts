interface UserInfo {
    name: string;
    age: number;
}

// 这时候我们不需要 UserInfo 的 name 属性。
type UserInfoT = Omit<UserInfo, "name">

// 这时候我们只需要 UserInfo 的 name 属性。
type UserInfoT1 = Pick<UserInfo, "name">

// 排除掉 "name"
type UserInfoT2 = Exclude<"name" | "age", "name">;

// 和 Exclude 恰好相反。
type ExtractT1 = "name" | "age" | "hob";
type ExtractT2 = "name" | "age";
type UserInfoT3 = Extract<ExtractT1, ExtractT2>;

// NonNullable
let demo3: NonNullable<undefined | number>;

// Parameters
// 定义一个函数
function getUserInfo(id:string, group:string){}
// 获取到函数需要的形参 Type[]
type GetUserInfoArg = Parameters<typeof getUserInfo>; 
const arg:GetUserInfoArg = [ "001", "002" ];
getUserInfo(...arg);

// ThisParameterType
function getUserInfo1(this:{ name:string }){}
const getUserInfoArgThis: ThisParameterType<typeof getUserInfo1> = {
    name:"王"
};

// OmitThisParameter
// 定义一个函数
function getUserInfo2(this:{ name:string }, id:string){}
// 去除 getUserInfo 函数 this 参，然后创建出来了一个新类型
const aaa: OmitThisParameter<typeof getUserInfo2> = (id:string)=>{} 




// infer
// type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
// type T10 = Foo<{ a: string; b: string }>; // T10类型为 string
// type T11 = Foo<{ a: string; b: number }>; // T11类型为 string | number


// typeof
function toArray(x: number): Array<number> {
    return [x];
}
type Func = typeof toArray; // -> (x: number) => number[]



interface User1 {
  name: string,
  age: number,
}

type Foo1 = (user: User1) => void;

/**
 最终结果：
 type P = [user: User]
 */
type P = Parameters<Foo1>;

const user = {
    name: '金小钗',
    age: 18,
}
const a: P = [user];



type ObjectDescriptor<D, M> = {
    data?: D;
    // this 的类型为联合类型，就是 data 与 methods 对象
    methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
  };
  
  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    const data: object = desc.data || {};
    const methods: object = desc.methods || {};
    return { ...data, ...methods } as D & M;
  }
  
  const obj = makeObject({
    data: { x: 1, y: 2 },
    methods: {
      moveBy(dx: number, dy: number) {
        // 这里的 this 是有类型的
        this.x += dx; // Strongly typed this
        this.y += dy; // Strongly typed this
      },
    },
  });
  
  obj.x = 10;
  obj.y = 20;
  obj.moveBy(5, 5);




// MyAwaited
type ExampleType = Promise<string>
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;
type Result1 = MyAwaited<ExampleType> // string
type Result2 = MyAwaited<number> // string


type Concat<T extends any[], U extends any[]> = [...T, ...U];
type ResultConcat = Concat<[1], [2]> // expected to be [1, 2]


// type Mapping<T extends any[]> = {
//     [P in T[number]]: P
// }
// type Push1<T extends readonly any[], U> = Mapping<T>[U] extends U ? T : [...T, U];



// type Chainable1<T = {}> = {
//     // 使用 Exclude 进行排除重复的 key
//     option<K extends string, V>(key: Exclude<K, keyof T>, value: V): Chainable<T & Record<K, V>>,
//     get(): T;
// }
// const config1: Chainable1

// const result2 = (config1 as Chainable1)
//   .option('foo', 123)
//   .option('foo', '123')
//   .option('name', 'type-challenges')
//   .option('bar', { value: 'Hello World' })
//   .get()

// 期望 result 的类型是：
// interface Result2 {
//   foo: number
//   name: string
//   bar: {
//     value: string
//   }
// }


type Last<T extends any[]> = [any, ...T][T["length"]];
type A = Last<[1, 2, 3]>


type Pop<T extends any[]> = T extends [...infer R, any] ? R : T;
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]




type TupleType<T extends any[]> = {
    [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]
} 
  
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<TupleType<T>>
  
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// 应推导出 `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)



type LookUp<U, T extends string> = U extends { type: T } ? U : never;
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`





type Replace1<S extends string, From extends string, To extends string> = 
    From extends '' 
        ? S 
        : S extends `${infer F}${From}${infer E}` 
            ? `${F}${To}${E}`
            : S;
type replaced = Replace<'types are fun!', '', 'awesome'>




type ReplaceAll1<S extends string, From extends string, To extends string> =
    From extends '' 
        ? S 
        : S extends `${infer F}${From}${infer E}` 
            ? `${F}${To}${ReplaceAll1<E, From, To>}`
            : S;
type replaced1 = ReplaceAll1<'t y p e s', ' ', ''> // 期望是 'types'




// type Permutation<T, K = T> = 
//     [T] extends [never]
//         ? []
//         : K extends K 
//             ? [K, ...Permutation<Exclude<T, K>>]
//             : never;


type LengthOfString<S extends string, K extends any[] = []> = 
    S extends `${infer F}${infer E}`
        ? LengthOfString<E, [...K, F]>
        : K['length'];