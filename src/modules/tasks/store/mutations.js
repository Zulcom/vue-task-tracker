import * as types from './mutation-types'

const mutations = {
  [types.TASKS_LOADED] (state, tasks) {
    state.tasks = tasks
  },
  [types.FILTER_CHANGED] (state, { type, id }) {
    const val = Number.parseInt(id)
    if (val >= 0) {
      state.filter_type = type
      state.filter_value = val
    } else {
      state.filter_type = null
      state.filter_value = null
    }
  },
  [types.SORT_CHANGED] (state, { id }) {
    state.sort = id
  }
}

export default mutations
