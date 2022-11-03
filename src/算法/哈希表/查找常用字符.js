/**
 * 1002.查找常用字符
 * https://leetcode.cn/problems/find-common-characters/
 * 
 * 给你一个字符串数组 words ，请你找出所有在 words 的每个字符串中都出现的共用字符（ 包括重复字符），并以数组形式返回。你可以按 任意顺序 返回答案。
 * 
 * 示例 1：
 *  输入：words = ["bella","label","roller"] 输出：["e","l","l"] 
 * 
 * 示例 2：
 *  输入：words = ["cool","lock","cook"] 输出：["c","o"]
 * 
 * 提示：
 *  1 <= words.length <= 100 1 <= words[i].length <= 100 words[i] 由小写英文字母组成
 */
var commonChars = function (words) {
	let res = []
	let size = 26
    // 初始化 hash 数组
	let firstHash = new Array(size).fill(0)   

	let a = "a".charCodeAt()
	let firstWord = words[0]
    
    // 用第一个字符串给hash初始化
	for (let i = 0; i < firstWord.length; i++) { 
		let idx = firstWord[i].charCodeAt()
		firstHash[idx - a] += 1
	}
	
    // 统计除第一个字符串外字符的出现频率
    // 初始化 hash 数组
	let otherHash = new Array(size).fill(0)    
	for (let i = 1; i < words.length; i++) {
		for (let j = 0; j < words[i].length; j++) {
			let idx = words[i][j].charCodeAt()
			otherHash[idx - a] += 1
		}
		
        // 更新hash，保证hash里统计26个字符在所有字符串里出现的最小次数
		for (let i = 0; i < size; i++) {
			firstHash[i] = Math.min(firstHash[i], otherHash[i])
		}

        // 重置otherHash
		otherHash.fill(0)
	}
	
    // 将hash统计的字符次数，转成输出形式
	for (let i = 0; i < size; i++) {
        // 注意这里是while，多个重复的字符
		while (firstHash[i] > 0) {
            // char -> string
			res.push(String.fromCharCode(i + a))

			firstHash[i]--
		}
	}

	return res
};


// 测试
const words1 = ["bella","label","roller"]
const words2 = ["cool","lock","cook"]
console.log(commonChars(words1))
console.log(commonChars(words2))