import Vue from 'vue'

import * as types from './mutation-types'

import { Logger } from '@/lib/Logger'
import api from '@/scripts/resolvers/api.js'

const key = 'tasks'
const actions = {
  /**
   * Loads all tasks, that user can access
   */
  loadTasks (context, { username, eraseCache }) {
    return new Promise(resolve => {
      const cache = Vue.prototype.$db.tasksCollection
      if (eraseCache) {
        api.tasks(username).then(res => {
          cache.setItem('tasks', res)
          context.commit(types.TASKS_LOADED, res)
        })
      } else {
        cache.getItem('tasks', (err, res) => {
          if (err) {
            Logger.error(err, key)()
            return
          }
          if (res) {
            context.commit(types.TASKS_LOADED, res)
          }
        })
      }
    })
  },
  applyFilter (context, { type, id }) {
    context.commit(types.FILTER_CHANGED, { type, id })
  },
  applySort (context, { id }) {
    context.commit(types.SORT_CHANGED, { id })
  },
  editTask (context, task) {
    const username = context.rootState.user.current.username
    api.setTask(username, task.id, task)
    Vue.prototype.$bus.$emit('task-saved')
  },
  addTask (context, task) {
    const username = context.rootState.user.current.username
    api.newTask(username, task)
    Vue.prototype.$bus.$emit('task-after-add')
  }
}

export default actions
