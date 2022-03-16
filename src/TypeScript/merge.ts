/**
 * 实现一个Merge工具类型，用于把两个类型合并成一个新的类型。
 * 第二种类型（SecondType）的Keys将会覆盖第一种类型（FirstType）的Keys。
 * 
 * 注意的是：合并属性，后一个类型会覆盖前一个类型。
 * 逻辑分析：
 *  1、将FirstType和SecondType做交叉类型，并遍历他们的每一个属性；
 *  2、如果当前的属性名在SecondType类型中，则使用SecondType类型中的当前属性值；
 *  3、如果当前属性名在FirstType类型中，则使用First类型中的当前属性值；
 *  4、否则为never。
 */

  
// type Merge<FirstType, SecondType> = {
//     [K in keyof (FirstType & SecondType)]: K extends keyof SecondType
//         ? SecondType[K]
//         : K extends keyof FirstType
//             ? FirstType[K]
//             : never;
// };

// 结合Omit内置工具类型
type Merge <FirstType, SecondType> = Omit<FirstType, keyof SecondType> & SecondType;


// 测试用例
interface MergeFoo {
    b: number
  }
  
interface MergeBar {
    a: number;
    b: string
}
type Obj = Merge<MergeFoo, MergeBar> // { a: number ; b: string }
  