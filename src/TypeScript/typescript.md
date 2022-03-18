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

### never 和 void 之间的区别
- 没有显式返回值的函数会隐式返回 undefined。尽管我们通常说这样的函数 “什么也不返回”，但实际上它是会返回的。在这些情况下，我们通常忽略返回值。在 TypeScript 中这些函数的返回类型被推断为 void。
- 具有 never 返回类型的函数永不返回。它也不返回 undefined。该函数没有正常完成，这意味着它可能会抛出异常或根本无法退出执行。

`never` 类型为底部类型，也称为零类型或空类型。它通常表示为⊥，表示计算未将结果返回给调用方。

`void` 类型，在另一方面，是一个单元类型（类型，它允许只有一个值），没有定义的操作。



# 泛型
## 默认值
```ts
// U的默认值是T
type IsUnion<T, U = T>
```

# TypeScipt工具类型库
[type-fest](https://github.com/sindresorhus/type-fest)