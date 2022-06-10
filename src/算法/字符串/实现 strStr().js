/**
 * 实现 strStr()
 * 
 * 题意：
 *  实现 strStr() 函数。
 *  给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
 * 
 * 示例 1: 
 *  输入: haystack = "hello", needle = "ll"
 *  输出: 2
 * 
 * 示例 2:
 *  输入: haystack = "aaaaa", needle = "bba" 
 *  输出: -1
 * 
 * 说明: 
 *  当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。
 * 
 * 
 * 思路：
 *  使用KMP算法
 * 
 * 
 * 总结：
 *  我们介绍了什么是KMP，KMP可以解决什么问题，然后分析KMP算法里的next数组，知道了next数组就是前缀表，再分析为什么要是前缀表而不是什么其他表。
 *  接着从给出的模式串中，我们一步一步的推导出了前缀表，得出前缀表无论是统一减一还是不减一得到的next数组仅仅是kmp的实现方式的不同。
 *  其中还分析了KMP算法的时间复杂度，并且和暴力方法做了对比。
 *  然后先用前缀表统一减一得到的next数组，求得文本串s里是否出现过模式串t，并给出了具体分析代码。又给出了直接用前缀表作为next数组，来做匹配的实现代码。
 *  可以说把KMP的每一个细微的细节都扣了出来，毫无遮掩的展示给大家了！
 */

// 前缀表统一减一
const strStr = function (haystack, needle) {
    if (needle.length === 0) return 0;

    // 计算next数组
    const getNext = (needle) => {
        let next = [];
        let j = -1;
        next.push(j);

        // 注意i从1开始
        for (let i = 1; i < needle.length; ++i) {
            // 前后缀不相同了
            while (j >= 0 && needle[i] !== needle[j + 1]) {
                // 向前回退
                j = next[j];
            }

            // 找到相同的前后缀
            if (needle[i] === needle[j + 1]) {
                j++;
            }

            // 将j（前缀的长度）赋给next[i]
            next.push(j);
        }

        return next;
    }

    let next = getNext(needle);
    // 因为next数组里记录的起始位置为-1
    let j = -1;

    // 注意i就从0开始
    for (let i = 0; i < haystack.length; ++i) {
        // 不匹配
        while (j >= 0 && haystack[i] !== needle[j + 1]) {
            // j 寻找之前匹配的位置
            j = next[j];
        }
            
        // 匹配，j和i同时向后移动
        if (haystack[i] === needle[j + 1]) {
            // i的增加在for循环里
            j++;
        }
            
        // 文本串s里出现了模式串t
        if (j === needle.length - 1) {
            return (i - needle.length + 1);
        }
    }

    return -1;
};

// 前缀表统一不减一
const strStr1 = function (haystack, needle) {
    if (needle.length === 0) {
        return 0;
    }

    // 计算next数组
    const getNext = (needle) => {
        let next = [];
        let j = 0;
        next.push(j);

        for (let i = 1; i < needle.length; ++i) {
            // 前后缀不相同了
            // j要保证大于0，因为下面有取j-1作为数组下标的操作
            while (j > 0 && needle[i] !== needle[j]) {
                // 注意这里，是要找前一位的对应的回退位置了
                j = next[j - 1];
            }

            // 找到相同的前后缀
            if (needle[i] === needle[j]) {
                // i的增加在for循环里
                j++;
            }
                
            // 将j（前缀的长度）赋给next[i]
            next.push(j);
        }

        return next;
    }

    let next = getNext(needle);
    // 因为next数组里记录的起始位置为0
    let j = 0;

    // 注意i就从0开始
    for (let i = 0; i < haystack.length; ++i) {
        // 不匹配
        while (j > 0 && haystack[i] !== needle[j]) {
            // j 寻找之前匹配的位置
            j = next[j - 1];
        }
            
         // 匹配，j和i同时向后移动
        if (haystack[i] === needle[j]) {
            j++;
        }
            
        // 文本串s里出现了模式串t
        if (j === needle.length) {
            return (i - needle.length + 1);
        }
    }

    return -1;
};



// 测试
// 2
const haystack1 = "hello"
const needle1 = 'll'
// -1
const haystack2 = "aaaaa"
const needle2 = 'bba'

console.log(strStr(haystack1, needle1))
console.log(strStr(haystack2, needle2))

console.log(strStr1(haystack1, needle1))
console.log(strStr1(haystack2, needle2))