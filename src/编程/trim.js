/**
 * trim
 * 
 * $1 -> $9: 在替换文本里, 脚本用 $1 -> $9 表示正则表达式中的括号匹配项的结果.
 */

function trim(value) {
    return value.replace(/^\s*([\S\s]*?)\s*$/g, '$1');
    // return value.replace(/^\s*|\s*$/g, '');
}
console.log(trim('  sasa   asa   hh '))