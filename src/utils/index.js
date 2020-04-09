/**
 * 深拷贝
 * @param {*} obj 
 */
export let deepCopy = function (obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是一个对象
    let newObj = obj instanceof Array ? [] : (obj==null?null:{});
    for (let key in obj) {
        // 遍历obj,并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
            // 判断属性值的类型，如果是对象递归调用深拷贝
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}

/**
 * 将一个数组按指定长度分割，组成一个新的数组集合
 * @param {*} array 
 * @param {*} size 
 */
export function chunkArr(array = [], size = 1) {
    //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
    const length = array.length
    //判断不是数组，或者size没有设置，size小于1，就返回空数组
    if (!length || !size || size < 1) {
        return []
    }
    //核心部分
    let index = 0 //用来表示切割元素的范围start
    let resIndex = 0 //用来递增表示输出数组的下标

    //根据length和size算出输出数组的长度，并且创建它。
    let result = new Array(Math.ceil(length / size))
    //进行循环
    while (index < length) {
        //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size))
    }
    //输出新数组
    return result
}