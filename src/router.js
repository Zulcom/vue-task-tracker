import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: 'Список задач'
      },
      component: () => import(/* webpackChunkName: "Index" */ './views/Index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Авторизация'
      },
      component: () => import(/* webpackChunkName: "LoginPage" */ './views/LoginPage.vue'),
    },
    {
      path: '/task/:id',
      name: 'task',
      props: true,
      meta: {
        title: 'Задача'
      },
      component: () => import(/* webpackChunkName: "Task" */ './views/Task.vue'),
    },
    {
      path: '/new',
      name: 'new',
      meta: {
        title: 'Создать'
      },
      component: () => import(/* webpackChunkName: "NewTask" */ './views/NewTask.vue'),
    },
  ],
})
