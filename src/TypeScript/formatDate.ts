/**
 * * 题目： 实现一个 type 类型，用于约束特殊时间格式的字符串
 * 
 * 例子：
 *  FormatDate<"DD-MM-YY">
 *  允许的字符串为：
 *  const date: FormatDate<"DD-MM-YY"> = "12-12-2024" | "12-02-2024"
 *  不允许的字符串为：
 *  const date: FormatDate<"DD-MM-YY"> = "122-12-2024" | "12-112-2024" | "12-12-12024" | ...
 * 
 * 时间格式支持多种分隔符： “-” | “." | "/"
 */

type Seperator = '-' | '.' | '/'

type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Num2 = Num | 0

type YY = `19${Num2}${Num2}` | `20${Num2}${Num2}`
type MM = `0${Num}` | `1${0 | 1 | 2}`
type DD = `${0}${Num}` | `${1 | 2}${Num2}` | `3${0 | 1}`

// 组合字符串字面量类型
type GenStr<Type extends string> =
    Type extends 'YY'
        ? YY
        : Type extends 'MM'
            ? MM
            : DD

/**
 * infer _ 用作占位符，用于在模式匹配中忽略 Bbb 和 Ccc 之间的任何字符。
 * 它允许你更关注于 Aaa 和 Bbb 以及它们在 Pattern 中的位置，同时忽略 Ccc 之前的任何内容。
 * 这种占位符在某些类型别名和条件类型检查中非常有用，它提供了一种简洁的方式来表达模式匹配，并允许你灵活地构建和使用类型。
 */
// type FormatDate<Pattern extends string> = 
//     Pattern extends `${infer Aaa}${Seperator}${infer Bbb}${Seperator}${infer Ccc}`
//         ? Pattern extends `${Aaa}${infer Sep}${Bbb}${infer _}${Ccc}`
//             ? `${GenStr<Aaa>}${Sep}${GenStr<Bbb>}${Sep}${GenStr<Ccc>}`
//             : never
//         : never

type FormatDate<Pattern extends string> =
    // 用模式匹配的方式，也就是 extends + infer 来提取出 YY、MM、DD 这三部分
    Pattern extends `${infer Aaa}${Seperator}${infer Bbb}${Seperator}${infer Ccc}`
        // 对分隔符进行推断
        ? Pattern extends `${Aaa}${infer Seperator1}${Bbb}${infer Seperator2}${Ccc}`
            // 对分隔符统一进行约束
            ? Seperator1 extends Seperator
                ?  Seperator2 extends Seperator1
                    ? `${GenStr<Aaa>}${Seperator1}${GenStr<Bbb>}${Seperator1}${GenStr<Ccc>}`
                    : never
                : never  
            : never 
        : never
        


// 测试
const a1: FormatDate<'YY-MM-DD'> = '2023-01-02';
const b1: FormatDate<'DD/MM/YY'> = '01/02/2024';
// const b2: FormatDate<'DD/MM-YY'> = '01/02/2024';
// const c1: FormatDate<'DD/MM/YY'> = '2024-01-02';


