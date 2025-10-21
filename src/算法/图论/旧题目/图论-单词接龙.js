/**
 * 127.单词接龙
 * https://leetcode.cn/problems/word-ladder/
 * 
 * 字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列：
 *  序列中第一个单词是 beginWord 。
 *  序列中最后一个单词是 endWord 。
 *  每次转换只能改变一个字母。
 *  转换过程中的中间单词必须是字典 wordList 中的单词。
 *  给你两个单词 beginWord 和 endWord 和一个字典 wordList ，找到从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0。
 * 
 * 示例 1：
 *  输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 *  输出：5
 *  解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
 * 
 * 示例 2：
 *  输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
 *  输出：0
 *  解释：endWord "cog" 不在字典中，所以无法进行转换。
 */
var ladderLength = function(beginWord, endWord, wordList) {
    // 将wordList转成Set，提高查询速度
    const wordSet = new Set(wordList);

    // Set元素个数为0 或者 endWord没有在wordSet出现，直接返回0
    if (wordSet.size === 0 || !wordSet.has(endWord)) return 0;

    // 记录word是否访问过
    const visitMap = new Map();// <word, 查询到这个word路径长度>
    
    // 初始化队列
    const queue = [];
    queue.push(beginWord);
    // 初始化visitMap
    visitMap.set(beginWord, 1);
    
    while(queue.length !== 0) {
        // 删除队首元素,将它的值存放在word
        let word = queue.shift();
        // 这个word的路径长度 
        let path = visitMap.get(word); 

        // 遍历单词的每个字符
        for (let i = 0; i < word.length; i++) { 
            // 对应26个字母ASCII值 从'a' 到 'z' 遍历替换
            for (let c = 97; c <= 122; c++) { 
                // 拼串得到新的字符串
                // 静态 String.fromCharCode() 方法返回由指定的 UTF-16 代码单元序列创建的字符串。
                let newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

                // 找到了end，返回path+1
                if (newWord === endWord) return path + 1; 

                // wordSet出现了newWord，并且newWord没有被访问过
                if (wordSet.has(newWord) && !visitMap.has(newWord)) {
                    // 添加访问信息
                    visitMap.set(newWord, path + 1);
                    queue.push(newWord);
                }
            }
        }
    }

    return 0;
};


// 测试
const beginWord1 = "hit"
const endWord1 = "cog"
const wordList1 = ["hot","dot","dog","lot","log","cog"]
const beginWord2 = "hit"
const endWord2 = "cog"
const wordList2 = ["hot","dot","dog","lot","log"]
console.log(ladderLength(beginWord1, endWord1, wordList1))
console.log(ladderLength(beginWord2, endWord2, wordList2))