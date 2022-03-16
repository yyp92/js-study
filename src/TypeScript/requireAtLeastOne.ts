/**
 * 实现一个RequireAtLeastOne工具类型，它将创建至少含有一个给定Keys的类型，其余的Keys保持原样。
 * 
 * 思路：
 *  1、给定的Keys类型需要约束于ObjectType；
 *  2、如果给定的KeysType中的Keys在ObjectType类型里，创建一个新的类型，遍历KeysType作为Key，并且-?字符，将可选变为必选，值类型为ObjectType[K]，然后将ObjectType和这个创建的新的类型做交叉类型。联合类型在extends条件中会做分发，因此最后组成联合类型返回；
 *  3、否则返回never。
 */

type RequireAtLeastOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
> = KeysType extends keyof ObjectType
    ? ObjectType & { [K in KeysType]-?: ObjectType[K] }
    : never;



// 测试
type Responder = {
    text?: () => string;
    json?: () => string;
    secure?: boolean;
};
// 表示当前类型至少包含 'text' 或 'json' 键
const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
   json: () => '{"message": "ok"}',
   secure: true
};
// @ts-expect-error 因为没有'text'和'json'中的任何一个，报错
const responder2: RequireAtLeastOne<Responder, 'text' | 'json'> = {
   secure: true
};
