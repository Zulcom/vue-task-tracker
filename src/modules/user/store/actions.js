import Vue from 'vue'

import * as types from './mutation-types'
import { Logger } from '@/lib/Logger'
import api from '@/scripts/resolvers/api.js'

const key = 'user'
const actions = {
  startSession (context) {
    const cache = Vue.prototype.$db.usersCollection
    cache.getItem('current-user', (err, user) => {
      if (err) {
        Logger.error(err, 'user')()
        return
      }
      if (user) {
        context.commit(types.USER_INFO_LOADED, user)
        context.commit(types.USER_START_SESSION)
        Vue.prototype.$bus.$emit('user-after-login', user)
      } else {
        Vue.prototype.$bus.$emit('session-after-nonauthorized')
      }
    })
  },
  /**
   * Login user and return user profile
   */
  login (context, { username, password }) {
    return api.users()
      .then(list => {
        const user = list.find(user => user.username === username && user.password === password)
        if (user !== undefined) {
          debugger
          context.commit(types.USER_INFO_LOADED, user)
          Vue.prototype.$bus.$emit('user-after-login', user)
          return user
        }
      })
      .catch(e => Logger.error('Failed to receive users list:' + e, key)())
  },
  /**
   * Logout user
   */
  logout (context,) {
    context.commit(types.USER_INFO_LOADED, null)
    this.dispatch('notification/spawnNotification', {
      type: 'success',
      message: 'Вы успешно вышли',
      action1: { label: 'OK' }
    })
    Vue.prototype.$bus.$emit('session-after-nonauthorized')
  },
  nextLayout (context) {
    const layoutCount = 2
    const nextLayout = context.state.current.taskLayout > layoutCount - 2 ? 0 : context.state.current.taskLayout + 1
    context.commit(types.USER_CHANGE_LAYOUT, nextLayout)
    // Place here update user prefs via api
  }
}

export default actions
