import * as types from './mutation-types'

const mutations = {

  [types.USER_START_SESSION] (state) {
    state.session_started = new Date()
  },
  [types.USER_INFO_LOADED] (state, currentUser) {
    state.current = currentUser
  },
  [types.USER_END_SESSION] (state, payload) {
    state.current = null
    state.session_started = null
  },
  [types.USER_CHANGE_LAYOUT] (state, layoutIndex) {
    state.current.taskLayout = layoutIndex
  }
}

export default mutations
