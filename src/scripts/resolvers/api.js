import usersStub from '../stubs/users.json'
import tasksStub from '../stubs/tasks.json'

export default {
  users () {
    return new Promise(resolve => resolve(usersStub))
  },
  tasks (username) {
    return new Promise(resolve => {
      if (Object.prototype.hasOwnProperty.call(tasksStub, username)) {
        resolve(tasksStub[username])
      } else {
        resolve([])
      }
    })
  },
  setTask (username, id, task) {
    const index = tasksStub[username].findIndex(el => el.id === id)
    tasksStub[username][index] = task
  },
  newTask (username, task) {
    const id = tasksStub[username][tasksStub[username].length - 1].id + 1 // подразумевается, что элементы в массиве отсортированы по id
    tasksStub[username].push({ id, ...task }) // do not mutate outside vuex mutators. Проблема уйдёт с реальным API
  }
}
