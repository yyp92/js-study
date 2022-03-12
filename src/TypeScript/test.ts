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
type T1 = "name" | "age" | "hob";
type T2 = "name" | "age";
type UserInfoT3 = Extract<T1, T2>;

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
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
type T10 = Foo<{ a: string; b: string }>; // T10类型为 string
type T11 = Foo<{ a: string; b: number }>; // T11类型为 string | number


// typeof
function toArray(x: number): Array<number> {
    return [x];
}
type Func = typeof toArray; // -> (x: number) => number[]

