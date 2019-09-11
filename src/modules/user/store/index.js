import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
export default {
  namespaced: true,
  state: {
    token: '',
    current: null,
    session_started: new Date(),
  },
  beforeRegistration,
  afterRegistration,
  getters,
  actions,
  mutations
}
