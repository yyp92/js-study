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

## infer
[infer](https://juejin.cn/post/6844904170353328135)