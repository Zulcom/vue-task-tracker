import * as localForage from 'localforage'
import UniversalStorage from '@/lib/Storage'

export function beforeRegistration ({ Vue, config, store }) {
  Vue.prototype.$db.tasksCollection = new UniversalStorage(localForage.createInstance({
    name: 'task-tracker',
    storeName: 'tasks',
    driver: localForage[config.localForage.defaultDrivers['tasks']]
  }))
}
