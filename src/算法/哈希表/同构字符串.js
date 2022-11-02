/**
 * 205.同构字符串
 * https://leetcode.cn/problems/isomorphic-strings/
 * 
 * 给定两个字符串 s 和 t，判断它们是否是同构的。
 * 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
 * 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。
 * 
 * 示例 1:
 *  输入：s = "egg", t = "add"
 *  输出：true
 * 
 * 示例 2：
 *  输入：s = "foo", t = "bar"
 *  输出：false
 * 
 * 示例 3：
 *  输入：s = "paper", t = "title"
 *  输出：true
 * 
 * 提示：可以假设 s 和 t 长度相同。
 */
var isIsomorphic = function(s, t) {
    let len = s.length;

    if (len === 0) return true;

    let maps = new Map();
    let mapt = new Map();

    for (let i = 0, j = 0; i < len; i++, j++) {
        if (!maps.has(s[i])) {
            // maps保存 s[i] 到 t[j]的映射
            maps.set(s[i], t[j]);
        }

        if (!mapt.has(t[j])) {
            // mapt保存 t[j] 到 s[i]的映射
            mapt.set(t[j], s[i]);
        }

        // 无法映射，返回 false
        if (maps.get(s[i]) !== t[j] || mapt.get(t[j]) !== s[i]) {
            return false;
        }
    };

    return true;
};


// 测试
const s1 = "egg"
const t1 = "add"
const s2 = "foo"
const t2 = "bar"
const s3 = "paper"
const t3 = "title"
console.log(isIsomorphic(s1, t1))
console.log(isIsomorphic(s2, t2))
console.log(isIsomorphic(s3, t3))