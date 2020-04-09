import axios from 'axios';
import vueCookie from "vue-cookies";
import router from "../router";
const host = location.host;
axios.defaults.timeout = 60000;

let devHostReg = /^(http?(s)?:\/\/)?((192\.168\.31\.)|(localhost))(.+)$/;//匹配开发环境的正则表达式
let testHostReg = /^(http?(s)?:\/\/)?((183\.196\.99\.))(.+)$/;//匹配183环境的正则表达式
// let prodHostReg = /^(http?(s)?:\/\/)?((i\.))(.+)$/;//匹配正式环境的正则表达式

let defaultUrl = "";

if (devHostReg.test(host)) {//开发环境请求地址
    defaultUrl = "http://192.168.1.1/";
} else if(testHostReg.test(host)){//测试环境请求地址
    defaultUrl = "http://192.168.1.2/";
}else {
    defaultUrl = "http://192.168.1.3/";
}
axios.interceptors.request.use(
    config => {
        let token = vueCookie.get("token");
        config.data = JSON.stringify(config.data);
        config.url = defaultUrl + config.url;
        config.headers = {
            'Content-Type': 'application/json;charset=utf-8',
            token,
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            let data = response.data || {};
            if (data.code == 200) {
                return Promise.resolve(response);
            } else if (data.code == 401) {//token失效
                router.push("/login")
            }else {
                if (response.data && response.data.type == 'application/octet-stream') {//下载的流文件
                    return Promise.resolve(response);
                } else {
                    // Message.error(response.data.message || "系统异常,请稍后重试");
                    return Promise.reject(response);
                }

            }
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            // Message.error("系统异常,请稍后重试");
            return Promise.reject(error.response);
        }
    }
)
/**
 * get请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            // reject(err.data)
        })
    });
}
/**
 * post请求
 * @param {*} url 
 * @param {*} params 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * put方法
 * @param {*} url 
 * @param {*} params 
 */
export function put(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                // reject(err)
            })
    })
}
/**
 * patch方法
 * @param {*} url 
 * @param {*} params 
 */
export function patch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                // reject(err)
            })
    })
}
/**
 * post下载
 * @param {*} url 
 * @param {*} params 
 */
export function downPost(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            data: params,
            responseType: 'blob',
        }).then(res => {
            // var filename = res.headers['content-disposition'];
            var filename = params.fileName;
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(res.data, filename);
            }else{
                var a = document.createElement("a");
                var url = window.URL.createObjectURL(res.data);

                a.href = url;
                a.download = filename+".jpg";
                a.click();
                window.URL.revokeObjectURL(url);
            }
            resolve(res)
        }).catch(err => { reject(err) })
    })
}