# typescript知识点
[typescript-练习题](https://juejin.cn/post/7062903623470514207)

[TypeScript 内置工具详谈](https://juejin.cn/post/6988364988427534349)


## interface 和 type 的区别
type 可以而 interface 不行
- type 可以声明基本类型别名，联合类型，元组等类型
```ts
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

```
- type 语句中还可以使用 typeof 获取实例的 类型进行赋值
```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div
```

interface 可以而 type 不行
```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string
}
*/
```


# 关键字
## infer
[infer](https://juejin.cn/post/6844904170353328135)


## unknown
https://juejin.cn/post/6844903866073350151
### 联合类型中的 unknown 类型
```ts
type UnionType1 = unknown | null;       // unknown
type UnionType2 = unknown | undefined;  // unknown
type UnionType3 = unknown | string;     // unknown
type UnionType4 = unknown | number[];   // unknown
type UnionType5 = unknown | any;  // any
```

### 交叉类型中的 unknown 类型
```ts
type IntersectionType1 = unknown & null;       // null
type IntersectionType2 = unknown & undefined;  // undefined
type IntersectionType3 = unknown & string;     // string
type IntersectionType4 = unknown & number[];   // number[]
type IntersectionType5 = unknown & any;        // any
```


## never
### 联合类型中的 never 类型
```ts
type T3 = number | never;   // number
type T4 = string | never;   // string
```

### 交叉类型中的 never 类型
```ts
type T1 = number & never;   // never
type T2 = string & never;   // never
```
