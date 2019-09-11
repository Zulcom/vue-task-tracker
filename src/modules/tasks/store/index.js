import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'

export default {
  namespaced: true,
  state: {
    tasks: [],
    filter_type: null,
    filter_value: null,
    sort: null,
  },
  beforeRegistration,
  afterRegistration,
  getters,
  actions,
  mutations
}
