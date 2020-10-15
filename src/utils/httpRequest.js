import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { Notification } from 'element-ui'

/**
 * 创建http请求对象
 */
const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  header: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

http.defaults.baseURL = 'http://localhost:8088/kdshop/'

// 环境的切换
// if (process.env.NODE_ENV == 'development') { //开发
//     http.defaults.baseURL = '/api';}
// else if (process.env.NODE_ENV == 'debug') { //测试
//     http.defaults.baseURL = 'https://www.ceshi.com';
// }
// else if (process.env.NODE_ENV == 'production') { //线上
//     http.defaults.baseURL = 'https://www.production.com';
// }

// post请求头
// http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 设置请求拦截
 */
http.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = store.state.token;
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token;
    }
    return config;
  },
  error => {
    return Promise.error(error);
  });

/**
 * 设置响应拦截
 */
http.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    // 直接拒绝往下面返回结果信息
    return Promise.reject(response)
  }
}, error => {
  if (error.response.data) {
    error.message = error.response.data.message
  }
  // 根据请求状态觉得是否登录或者提示其他
  if (error.response.status === 401) {
    store.commit('REMOVE_INFO');
    router.push({
      path: '/login'
    });
    error.message = '请重新登录';
  }
  if (error.response.status === 403) {
    error.message = '权限不足，无法访问';
  }
  Notification.error({
    message: error.message,
    duration: 3 * 1000
  })
  return Promise.reject(error.response)
})

export function get(url, params) {
  return new Promise((resolve, reject) => {
    http.get(url, { params: params }).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      if (!err.response) {
        Notification({
          showClose: true,
          message: '请求异常',
          type: 'error'
        })
      } else {
        reject(err.data)
        console.log(err.response, '异常')
      }
    })
  })
}
export function post(url, params) {
  return new Promise((resolve, reject) => {
    http.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        if (!err.response) {
          Notification({
            showClose: true,
            message: '请求异常',
            type: 'error'
          });
        } else {
          reject(err.data);
          console.log(err.response, '异常2');
        }
      })
  });
}
export function deletes(url, params) {
  return new Promise((resolve, reject) => {
    http.delete(url, {
      data: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export function put(url, params) {
  return new Promise((resolve, reject) => {
    http.put(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export default http
