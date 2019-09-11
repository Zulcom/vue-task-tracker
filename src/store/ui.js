export default {
  namespaced: true,
  state: {
    overlay: false,
    loader: false,
    authElem: 'login',
  },
  mutations: {
    setOverlay (state, action) {
      state.overlay = action === true
    },
    setLoader (state, action) {
      state.loader = action === true
    },
    setAuthElem (state, action) {
      state.authElem = action
    }
  },
  actions: {
  }
}
