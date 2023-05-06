/**
 * 判断手机是Andoird还是IOS
 * 
 * 1: ios
 * 2: android
 * 3: 其它
 */
const getOSType=() => {
    let u = navigator.userAgent
    let app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    
    if (isIOS) {
        return 1;
    }
    
    if (isAndroid) {
        return 2;
    }
    
    return 3;
}