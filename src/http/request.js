import axios from 'axios';
import vueCookie from "vue-cookies";
import router from "../router";

axios.defaults.timeout = 60000;

export const defaultUrl = process.env.BASE_URL

axios.interceptors.request.use(
    config => {
        let token = vueCookie.get("token");
        config.data = JSON.stringify(config.data);
        config.url = process.env.BASE_URL + config.url;
        config.headers = {
            'Content-Type': 'application/json;charset=utf-8',
        }
        if (token && token != "null") {
            config.headers.Authorization = `${token}`;
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
            } else {
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
            } else {
                var a = document.createElement("a");
                var url = window.URL.createObjectURL(res.data);

                a.href = url;
                a.download = filename + ".jpg";
                a.click();
                window.URL.revokeObjectURL(url);
            }
            resolve(res)
        }).catch(err => { reject(err) })
    })
}