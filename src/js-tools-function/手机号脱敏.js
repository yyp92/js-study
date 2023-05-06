/**
 * 手机号脱敏
 */
const hideMobile = (mobile) => {
    return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}


// 测试
console.log(hideMobile('17731123421'))