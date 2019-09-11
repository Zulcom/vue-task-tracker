import * as localForage from 'localforage'
import UniversalStorage from '@/lib/Storage'

export function beforeRegistration ({ Vue, config, store }) {
  Vue.prototype.$db.usersCollection = new UniversalStorage(localForage.createInstance({
    name: 'task-tracker',
    storeName: 'user',
    driver: localForage[config.localForage.defaultDrivers['user']]
  }))
}
