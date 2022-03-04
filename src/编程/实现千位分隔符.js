/**
 * 实现千位分隔符
 * https://www.jianshu.com/p/928c68f92c0c
 * 
 * 千位分隔符格式的规则是数字的整数部分每三位一组，以“，”分节。小数部分不分节 。
 */

// 方法一：循环
// function numFormat(num){
//     num = num.toString().split('.');  // 分隔小数点
//     var arr = num[0].split('').reverse();  // 转换成字符数组并且倒序排列
//     var res = [];

//     for (var i = 0, len = arr.length; i < len; i++) {
//       if (i % 3 === 0 && i !== 0){
//          res.push(',');   // 添加分隔符
//       }
//       res.push(arr[i]);
//     }

//     res.reverse(); // 再次倒序成为正确的顺序

//     if (num[1]) {  // 如果有小数的话添加小数部分
//       res = res.join('').concat('.' + num[1]);
//     }
//     else {
//       res = res.join('');
//     }

//     return res;
// }


// 方法二: 使用JS自带的函数 toLocaleString
// 小数部分会根据四舍五入只留下三位。
// a.toLocaleString() 


// 方法三： 正则
function numFormat(num){
    // 先提取整数部分
    var res = num.toString().replace(/\d+/, function(n) {
        // 处理整数的千分位
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
            return $1 + ',';
        });
    })

    return res;
}

var a=1234567894532;
var b=673439.4542;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"
  