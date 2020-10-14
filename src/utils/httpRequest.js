// import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import { clearLoginInfo } from '@/utils'

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

http.defaults.baseURL = 'http://127.0.0.1:8088/kdshop/'

/**
 * 设置请求拦截
 */
http.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 设置响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default http
