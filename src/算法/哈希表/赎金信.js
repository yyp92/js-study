/**
 * 383.赎金信
 * https://leetcode.cn/problems/ransom-note/
 * 
 * 给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串，判断第一个字符串 ransom 能不能由第二个字符串 magazines 里面的字符构成。如果可以构成，返回 true ；否则返回 false。
 * (题目说明：为了不暴露赎金信字迹，要从杂志上搜索各个需要的字母，组成单词来表达意思。杂志字符串中的每个字符只能在赎金信字符串中使用一次。)
 * 
 * 注意：
 *  你可以假设两个字符串均只含有小写字母。
 *  canConstruct("a", "b") -> false
 *  canConstruct("aa", "ab") -> false
 *  canConstruct("aa", "aab") -> true
 */

 var canConstruct = function(ransomNote, magazine) {
    const strArr = new Array(26).fill(0)
    const base = "a".charCodeAt();

    if (ransomNote.length > magazine.length) {
        return false;
    }

    for (const s of magazine) {
        // 通过recode数据记录 magazine里各个字符出现次数
        strArr[s.charCodeAt() - base]++;
    }

    for (const s of ransomNote) {
        const index = s.charCodeAt() - base;

        // 遍历ransomNote，在record里对应的字符个数做--操作
        strArr[index]--;

        // 如果小于零说明ransomNote里出现的字符，magazine没有
        if (strArr[index] < 0) return false;
    }

    return true;
};



// 测试
console.log(canConstruct("a", "b"))
console.log(canConstruct("aa", "ab"))
console.log(canConstruct("aa", "aab"))