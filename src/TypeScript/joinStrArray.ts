/**
 * JoinStrArray
 * 
 * 定义一个JoinStrArray工具类型，用于根据指定的Separator分隔符，对字符串数组类型进行拼接
 * 
 * JoinStrArray工具方法，Arr泛型必须约束于string[]类型，Separator为分隔符，也必须约束于string类型；
 *  1、首先Arr约束于后面[infer A, ...infer B]并通过infer关键字推导拿到第一个索引A的类型，以及剩余（rest）数组的类型为B；
 *  2、如果满足约束，则连接字符，连接字符使用模板变量，先判断A（也就是第一个索引）是否约束于string类型，满足就取第一个A否则直接返回空字符串；
 *  3、后面连接的B（...rest）判断是否满足于[string, ...string[]]，意思就是是不是还有多个索引。如果有，用分割符号，加上递归再调用JoinStrArray工具类型方法，Arr泛型就再为 B ，分隔符泛型Separator不变。减治思想，拿出数组的每一项，直至数组为空。
 * 最开始的话，如果Arr不满足约束，那么直接返回为空字符串。
 */

type JoinStrArray<Arr extends string[], Separator extends string> = Arr extends [infer A, ...infer B]
    ? `${A extends string ? A : ''}${B extends [string, ...string[]]
        ? `${Separator}${JoinStrArray<B, Separator>}`
        : ''}`
    : '';


// 测试用例
type Names = ["Sem", "Lolo", "Kaquko"]
type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"
