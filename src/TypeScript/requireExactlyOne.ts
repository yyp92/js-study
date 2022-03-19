/**
 * 实现RequireExactlyOne工具类型，用于满足以下功能。
 * 即只能包含age或gender属性，不能同时包含这两个属性。
 */

type RequireExactlyOne<T, Keys extends keyof T, K extends keyof T = Keys> = Keys extends any
  ? Omit<T, K> & Required<Pick<T, Keys>> & Partial<Record<Exclude<K, Keys>, never>>
  : never;

// 想要构建成这个样子才可以满足条件
// type Test = { name: string } & ({ age: number, gender?: never } | { age?: never, gender: number })

// type TTT =
//   | ({ name: string } & { age: number } & { gender?: never })
//   | ({ name: string } & { age?: never } & { gender: number });


// 测试
interface RequireExactlyOnePerson {
    name: string;
    age?: number;
    gender?: number;
}

const RequireExactlyOnep1: RequireExactlyOne<RequireExactlyOnePerson, 'age' | 'gender'> = {
    name: "lolo",
    age: 7,
};

const RequireExactlyOnep2: RequireExactlyOne<RequireExactlyOnePerson, 'age' | 'gender'> = {
    name: "lolo",
    gender: 1
};

// Error
// const RequireExactlyOnep3: RequireExactlyOne<RequireExactlyOnePerson, 'age' | 'gender'> = {
//     name: "lolo",
//     age: 7,
//     gender: 1
// }
