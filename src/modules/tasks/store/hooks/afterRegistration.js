import config from '@/config/default.json'

export function afterRegistration ({ Vue, store }) {
  Vue.prototype.$bus.$on('user-after-login', (user) => {
    (function reload (username) {
      store.dispatch('tasks/loadTasks', { username: user.username, eraseCache: true })
      setTimeout(reload, config.tasks.reloadInterval * 1000, user.username, true)
    })(user.username)
  })
  Vue.prototype.$bus.$on('task-filter-change', ({ type, id }) => {
    store.dispatch('tasks/applyFilter', { type, id })
  })
  Vue.prototype.$bus.$on('task-sort-change', ({ id }) => {
    store.dispatch('tasks/applySort', { id })
  })
  Vue.prototype.$bus.$on('task-changed', (task) => {
    store.dispatch('tasks/editTask', task)
  })
  Vue.prototype.$bus.$on('task-before-add', (task) => {
    store.dispatch('tasks/addTask', task)
  })
}
