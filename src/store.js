import Vue from 'vue'
import Vuex from 'vuex'
import ui from '@/store/ui'
import notification from '@/modules/notification/store'

if (typeof Vue.prototype.$db === 'undefined') {
  Vue.prototype.$db = {}
}
Vue.use(Vuex)
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    ui,
    notification,
  },
  state: {},
  mutations: {},
  actions: {},
})

export default store
