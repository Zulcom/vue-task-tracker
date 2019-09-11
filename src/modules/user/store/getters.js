const getters = {
  isLoggedIn (state) {
    return state.current !== null
  },
  current (state) {
    return state.current
  },
  taskLayout (state) {
    return state.current ? state.current.taskLayout : 0
  }
}

export default getters
