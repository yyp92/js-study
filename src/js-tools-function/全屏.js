/**
 * 开启全屏
 */
const launchFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen()
    }
}


/**
 * 关闭全屏
 */
const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}