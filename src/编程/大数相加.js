/**
 * 两个大数相加
 * https://zhuanlan.zhihu.com/p/72179476
 * 
 * 思路：
 *  1.转为字符串
 *  2.将字符串的长度对齐
 *  3.从个位开始相加
 * 
 * 假如我们要进行 9007199254740991 + 1234567899999999999
 */
let a = "9007199254740991";
let b = "1234567899999999999";

function add(a, b){
    // 取两个数字的最大长度
    let maxLength = Math.max(a.length, b.length);

    // 用0去补齐长度
    a = a.padStart(maxLength, 0); // "0009007199254740991"
    b = b.padStart(maxLength, 0); // "1234567899999999999"

    // 定义加法过程中需要用到的变量
    let t = 0;
    let f = 0; // 进位
    let sum = "";

    for (let i = maxLength - 1; i >= 0; i--) {
        t = parseInt(a[i]) + parseInt(b[i]) + f;
        f = Math.floor(t/10);
        sum = t % 10 + sum;
    }

    // 最高位，因为都是个位数相加，所以f最大为1
    if (f == 1) {
        sum = "1" + sum;
    }

    return sum;
}

console.log(add(a, b))
// 1243575099254740990