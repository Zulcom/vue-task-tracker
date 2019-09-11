import config from '@/config/default.json'

export default {
  methods: {
    getPriorityLabel (id) {
      return config.priority.label[id]
    },
    getPriorityColor (id) {
      return 'bg-cl-' + config.priority.color[id]
    },
    getStatusIcon (id) {
      return config.status.color[id]
    },
    getStatusLabel (id) {
      return config.status.label[id]
    },
  },
  computed: {
    priorityArray () {
      return config.priority.label
    },
    statusArray () {
      return config.status.label
    }
  },
}
