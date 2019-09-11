import Vue from 'vue'
const filterExt = {
  $dataFilters: {
    value: [],
    writable: true
  }, // data filters to be registered by extension developers
  $filter: {
    get: function () {
      return (eventName, callback) => {
        if (!this.$dataFilters[eventName]) {
          this.$dataFilters[eventName] = []
        }
        this.$dataFilters[eventName].push(callback)
      }
    }
  },
  $emitFilter: {
    get: function () {
      return (eventName, ...args) => {
        if (args.length === 1) {
          args = args[0]
        }
        this.$emit(eventName, args)
        let promises = []
        if (this.$dataFilters[eventName]) {
          for (let cb of this.$dataFilters[eventName]) {
            promises.push(cb(args))
          }
        }
        return Promise.all(promises)
      }
    }
  }
}
const EventBus = new Vue()
if (!EventBus.$dataFilters) {
  Object.defineProperties(EventBus, filterExt)
}

const EventBusPlugin = {
  install (Vue) {
    if (!Vue.prototype.$bus) {
      Object.defineProperties(Vue.prototype, {
        $bus: {
          get: function () {
            return EventBus
          }
        }
      })
    }
  }
}
export { EventBusPlugin as default }
