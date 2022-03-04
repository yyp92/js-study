/**
 * 实现字符串翻转
 * 
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
 */

// 从左边和右边同事转换位置
// var reverseString = function(s) {
//     for (let i = 0; i< Math.floor(s.length /2); i++) {
//         for (let j = s.length - 1; j >= Math.floor(s.length /2); j--) {
//             if(i + j == s.length - 1){
//                 var temp = s[i]
//                 s[i] = s[j]
//                 s[j] = temp
//             }
//         }
//     }

//     return s
// };

// 双指针法
// 左指针指向头，右指针指向尾
// 交换左右指针所指向的内容就可以反转字符串
var reverseString = function (s) {
    /* let left = 0,
      right = s.length - 1; */
    // js这样赋值看上去会比较简洁一些
    let [left, right] = [0, s.length - 1];

    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }

    return s
};

const s = ["h", "e", "l", "l", "o"]
const s1 = ["H", "a", "n", "n", "a", "h"]
console.log(reverseString(s))
console.log(reverseString(s1))
// [ 'o', 'l', 'l', 'e', 'h' ]
// [ 'h', 'a', 'n', 'n', 'a', 'H' ]