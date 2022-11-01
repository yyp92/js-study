/**
 * 242.有效的字母异位词
 * https://leetcode.cn/problems/valid-anagram/
 * 
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 示例 1: 输入: s = "anagram", t = "nagaram" 输出: true
 * 示例 2: 输入: s = "rat", t = "car" 输出: false
 * 说明: 你可以假设字符串只包含小写字母。
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const resSet = new Array(26).fill(0);
    const base = "a".charCodeAt();

    for (const i of s) {
        // 并不需要记住字符a的ASCII，只要求出一个相对数值就可以了
        resSet[i.charCodeAt() - base]++;
    }

    for (const i of t) {
        // 如果t中某个字符在resSet数组中为0，则s中肯定没有
        if (!resSet[i.charCodeAt() - base]) {
            return false;
        }

        resSet[i.charCodeAt() - base]--;
    }

    // resSet数组所有元素都为零0，说明字符串s和t是字母异位词
    return true;
};


// 测试
const s1 = "anagram"
const t1 = "nagaram"
const s2 = "rat"
const t2 = "arc"
console.log(isAnagram(s1, t1))
console.log(isAnagram(s2, t2))