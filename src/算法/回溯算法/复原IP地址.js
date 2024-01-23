/**
 * 复原IP地址
 * 
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 * 有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
 * 例如："0.1.2.201" 和 "192.168.1.1" 是 有效的 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效的 IP 地址。
 * 
 * 示例 1：
 *  输入：s = "25525511135"
 *  输出：["255.255.11.135","255.255.111.35"]
 * 
 * 示例 2：
 *  输入：s = "0000"
 *  输出：["0.0.0.0"]
 * 
 * 示例 3：
 *  输入：s = "1111"
 *  输出：["1.1.1.1"]
 * 
 * 示例 4：
 *  输入：s = "010010"
 *  输出：["0.10.0.10","0.100.1.0"]
 * 
 * 示例 5：
 *  输入：s = "101023"
 *   输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 * 
 * 提示：
 * 0 <= s.length <= 3000
 * s 仅由数字组成
 */

const restoreIpAddresses = function(s) {
    const res = [], path = [];
    backtracking(0, 0)
    return res;

    function backtracking(startIndex) {
        const len = path.length;

        // 因为ip是4段
        if (len > 4) return;

        // 符合要求的
        if (len === 4 && startIndex === s.length) {
            res.push(path.join("."));
            return;
        }

        for (let j = startIndex; j < s.length; j++) {
            const str = s.slice(startIndex, j + 1);

            
            // 如果大于255了不合法
            if (str.length > 3 || +str > 255) break;
            // 0开头的数字不合法
            if (str.length > 1 && str[0] === "0") break;

            path.push(str);
            backtracking(j + 1);

            // 回溯
            path.pop()
        }
    }
};



// 测试
// ["255.255.11.135","255.255.111.35"]
const s1 = "25525511135"
// ["0.0.0.0"]
const s2 = "0000"
// ["1.1.1.1"]
const s3 = "1111"
// ["0.10.0.10","0.100.1.0"]
const s4 = "010010"
// ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
const s5 = "101023"

console.log(restoreIpAddresses(s1))
console.log(restoreIpAddresses(s2))
console.log(restoreIpAddresses(s3))
console.log(restoreIpAddresses(s4))
console.log(restoreIpAddresses(s5))