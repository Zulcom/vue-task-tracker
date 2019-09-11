const getters = {
  current (state) {
    if (state.sort || state.filter_type) {
      return state.tasks.slice()
        .sort((l, r) => l[state.sort] > r[state.sort] ? 1 : -1)
        .filter(task => task[state.filter_type] === state.filter_value)
    } else {
      return state.tasks
    }
  },
  taskById: state => id => state.tasks.find(task => task.id === id)

}

export default getters
