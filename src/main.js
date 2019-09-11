import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'

import { sync } from 'vuex-router-sync'

import EventBusPlugin from '@/plugins/event-bus/index'
import * as coreFilters from '@/filters/index'
import VueProgressBar from 'vue-progressbar'
import user from '@/modules/user/store'
import tasks from '@/modules/tasks/store'

import config from '@/config/default.json'

const registerModule = (module, path) => {
  module.beforeRegistration({ Vue, config, store })
  store.registerModule(path, module)
  module.afterRegistration({ Vue, config, store })
}
const createApp = async () => {
  Vue.config.productionTip = false

  sync(store, router)
  Vue.use(EventBusPlugin)
  Vue.use(VueProgressBar)
  Vue.use(Meta)

  Object.keys(coreFilters).forEach(key => {
    Vue.filter(key, coreFilters[key])
  })

  registerModule(user, 'user')
  registerModule(tasks, 'tasks')

  Vue.prototype.$bus.$on('session-after-nonauthorized', () => {
    // Subscribe here to prevent accident like 'session starts before router guard register' or reserve situation
    router.push('/login')
  })
  return new Vue({
    router,
    store,
    render: h => h(App),
  })
}
(async () => {
  const app = await createApp()
  router.onReady(() => {
    app.$mount('#app')
  })
})()
