import * as types from './../mutation-types'

export function afterRegistration ({ Vue, store }) {
  Vue.prototype.$bus.$on('user-before-logout', () => {
    store.dispatch('user/logout', { silent: false })
  })
  Vue.prototype.$bus.$on('user-next-layout', () => {
    store.dispatch('user/nextLayout')
  })
  store.subscribe((mutation, state) => {
    const type = mutation.type
    if (
      type.endsWith(types.USER_INFO_LOADED)
    ) {
      Vue.prototype.$db.usersCollection.setItem('current-user', state.user.current).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }
  })
  store.dispatch('user/startSession')
}
