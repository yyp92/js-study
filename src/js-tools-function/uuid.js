/**
 * uuid
 * uuid一般应由后端来进行生成
 */
const uuid = () => {
    const temp_url = URL.createObjectURL(new Blob())
    const uuid = temp_url.toString()

    // 释放这个url
    URL.revokeObjectURL(temp_url) 

    return uuid.substring(uuid.lastIndexOf('/') + 1)
}


// 测试
// a640be34-689f-4b98-be77-e3972f9bffdd
console.log(uuid())