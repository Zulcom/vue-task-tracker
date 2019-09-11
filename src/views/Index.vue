<template>
  <div class="w-100 container">
    <div class="container">
      <div class="flex middle-xs between-xs">
        <h2 class="my5">
          Список задач ({{ tasks.length }})
        </h2><a href="/new">Создать</a>
        <div>
          <label>Сортировка
            <select @change="applySort($event.target.value)">
              <option value="id">По умолчанию</option>
              <option value="id">По порядку добавления</option>
              <option value="status">По статусу</option>
              <option value="priority">По приоритетам</option>
            </select>
          </label>
        </div>
        <div class="filters">
          <label>Статус
            <select class="mx10" @change="applyFilter('status',$event.target.value)">
              <option value="-1" selected>Все</option>
              <option v-for="(status,i) in statusArray" :value="i" :key="i">
                {{ status }}
              </option>
            </select>
          </label>
          <label>Приоритет
            <select class="mx10" @change="applyFilter('priority',$event.target.value)">
              <option value="-1" selected>Все</option>
              <option v-for="(priority,i) in priorityArray" :value="i" :key="i">
                {{ priority }}
              </option>
            </select>
          </label>
        </div>
        <button class="brdr-none bg-cl-transparent" type="button" @click="changeLayout">
          <i class="material-icons">
            {{ currentIcon }}
          </i>
        </button>
      </div>
      <component :is="currentLayout" :tasks="tasks" />
    </div>
  </div>
</template>

<script>
import TasksTable from '@/layouts/Tasks/Table.vue'
import TasksOverview from '@/layouts/Tasks/Overview.vue'
import Configurable from '@/mixins/Configurable'

export default {
  name: 'Index',
  mixins: [Configurable],
  data () {
    return {
      currentFilter: { type: null, value: null },
      sort: null,
    }
  },

  metaInfo () {
    return {
      title: this.$route.meta.title,
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  methods: {
    applyFilter (type, id) {
      this.$bus.$emit('task-filter-change', { type, id })
    },
    applySort (id) {
      this.$bus.$emit('task-sort-change', { id })
    },
    changeLayout () {
      this.$bus.$emit('user-next-layout')
    }
  },
  computed: {
    tasks () {
      return this.$store.getters['tasks/current']
    },
    currentLayout () {
      const layouts = ['TasksTable', 'TasksOverview']
      return layouts[this.$store.getters['user/taskLayout']]
    },
    currentIcon () {
      const iconsList = ['dehaze', 'notes']
      return iconsList[this.$store.getters['user/taskLayout']]
    },
  },

  components: { TasksTable, TasksOverview },
}
</script>
