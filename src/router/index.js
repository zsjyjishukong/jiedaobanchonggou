import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index/Index.vue'], resolve),
      meta: {
        title: '孔家庄街道办事处户籍管理系统'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login/Login.vue'], resolve),
      meta: {
        title: '管理员登录'
      }
    }
  ]
})
