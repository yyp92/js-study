/**
 * 替换空格
 * 
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 * 示例 1： 输入：s = "We are happy."
 * 输出："We%20are%20happy."
 * 
 * 
 * 思路：
 *  如果想把这道题目做到极致，就不要只用额外的辅助空间了！
 *  首先扩充数组到每个空格替换成"%20"之后的大小。
 *  然后从后向前替换空格，也就是双指针法，过程如下：
 *      i指向新长度的末尾，j指向旧长度的末尾。
 * 
 *  有同学问了，为什么要从后向前填充，从前向后填充不行么？
 *  从前向后填充就是O(n^2)的算法了，因为每次添加元素都要将添加元素之后的所有元素向后移动。
 *  其实很多数组填充类的问题，都可以先预先给数组扩容带填充后的大小，然后在从后向前进行操作。
 * 
 *  这么做有两个好处：
 *      不用申请新数组。
 *      从后向前填充元素，避免了从前先后填充元素要来的 每次添加元素都要将添加元素之后的所有元素向后移动。
 * 
 *  时间复杂度，空间复杂度均超过100%的用户。
 *      时间复杂度：O(n)
 *      空间复杂度：O(1)
 */

const replaceSpace = function(s) {
    // 字符串转为数组
   const strArr = Array.from(s);
   let count = 0;
 
   // 计算空格数量
   for (let i = 0; i < strArr.length; i++) {
     if (strArr[i] === ' ') {
       count++;
     }
   }
 
   let left = strArr.length - 1;
   let right = strArr.length + count * 2 - 1;
 
   while(left >= 0) {
     if (strArr[left] === ' ') {
       strArr[right--] = '0';
       strArr[right--] = '2';
       strArr[right--] = '%';
       left--;
     }
     else {
       strArr[right--] = strArr[left--];
     }
   }
 
   // 数组转字符串
   return strArr.join('');
};


// 测试
const s = "We are happy."
console.log(replaceSpace(s))