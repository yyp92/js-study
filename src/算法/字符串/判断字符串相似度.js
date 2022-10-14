/**
 * 判断字符串相似度
 */

// 方法1：暴力
/**
 * 获取2个字符串的相似度
 * @param {string} str1 字符串1
 * @param {string} str2 字符串2
 * @returns {number} 相似度 
 */
 function getSimilarity(str1, str2) {
    let sameNum = 0
    // 寻找相同字符
    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            if (str1[i] === str2[j]) {
                sameNum ++ 
                break
            }
        }
    }

    // 判断2个字符串哪个长度比较长
    let length = str1.length > str2.length ? str1.length : str2.length
    return (sameNum / length) * 100 || 0
    // return `${((sameNum / length) * 100).toFixed(0) || 0}%`
}


// 动态规划
// 解释：https://blog.csdn.net/xcxy2015/article/details/77164126
function getSimilarity1(str1, str2) {
    // 计算两个字符串长度
    const len1 = str1.length;
    const len2 = str2.length;

    // 创建装载数组
    const dif = [];
    for (let i = 0; i < len1 + 1; i++) {
        dif.push(new Array(len2 + 1));
    }

    // 赋初始值
    for (let i = 0; i <= len1; i++) {
        dif[i][0] = i;
    }
    for (let i = 0; i <= len2; i++) {
        dif[0][i] = i;
    }

    // 计算两个字符串是否一样
    const ch1 = str1.split('');
    const ch2 = str2.split('');
    let temp;
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++){
            if (ch1[i - 1] == ch2[j - 1]) {
                temp = 0;
            }
            else {
                temp = 1;
            }

            // 取最小值
            const temp1 = dif[i - 1][j - 1] + temp;
            const temp2 = dif[i][j - 1] + 1;
            const temp3 = dif[i - 1][j] + 1;

            dif[i][j] = Math.min(temp1, temp2, temp3);
        }
    }

    // 计算相似度
    const similarity = 1 - dif[len1][len2] / Math.max(str1.length, str2.length);
    return similarity;
}



// 测试

// var s1 = getSimilarity('龙凤店','龙凤店')  // 1
// var s2 = getSimilarity('龙_神话与幻兽','龙凤店')  // 0.1
// var s3 = getSimilarity('龙_神话与幻兽','龙凤店')  // 0.1
// var s4 = getSimilarity('龙','龙_神话与幻兽')  // 0.1
// var s5 = getSimilarity('黑豹','龙')  // 0
// var s6 = getSimilarity('黑豹','黑豹')  // 1
// var s7 = getSimilarity('黑衣人3','黑豹');  // 0.2
// var s8 = getSimilarity('黑衣人3','黑衣人3');  // 1
// console.log('getSimilarity', s1, s2, s3, s4, s5, s6, s7, s8)
const s9 = getSimilarity('我和我的祖国', '我我')
console.log('getSimilarity', s9)