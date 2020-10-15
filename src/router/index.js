import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Index'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  }
  // {
  //   path: 'addGoods',
  //   name: 'AddGoods',
  //   meta: {
  //     requireAuth: true // 判断是否需要权限登录
  //   },
  //   component: AddGoods
  // }
]

const router = new VueRouter({
  routes
})

/**
 * 路由导航守卫
 * to 将要访问的路径
 * from 从哪个路径跳转而来
 * next 是一个函数，表示放行。next()有参数的时候表示强制跳转
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    const token = sessionStorage.getItem('token')
    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === '/login') {
      } else {
        next()
      }
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
