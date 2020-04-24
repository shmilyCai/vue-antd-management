import {
    invalid,
} from "@utils/regExp";
/**
 * 校验身份证号
 * @param {*} r 
 * @param {*} value 
 * @param {*} callback 
 */
export const idCardValid = (r,value,callback)=>{
    if(!invalid.idCardReg.test(value)){
        callback("请输入正确的身份证号")
    }
    callback();
}
/**
 * 校验邮箱
 * @param {} r 
 * @param {*} value 
 * @param {*} callback 
 */
export const mailValid = (r,value,callback)=>{
    if(!invalid.mailReg.test(value)){
        callback("请输入正确的邮箱地址")
    }
    callback();
}
/**
 * 校验手机号
 * @param {} r 
 * @param {*} value 
 * @param {*} callback 
 */
export const phoneValid = (r,value,callback)=>{
    if(!invalid.phoneReg.test(value)){
        callback("请输入正确的手机号")
    }
    callback();
}
/**
 * 校验用户名
 * @param {} r 
 * @param {*} value 
 * @param {*} callback 
 */
export const accountValid = (r,value,callback)=>{
    if(!invalid.accountReg.test(value)){
        callback("请输入正确的用户名格式(6~20位英文、数字组成)")
    }
    callback();
}