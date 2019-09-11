<template>
  <div class="container" v-if="data">
    <div class="flex middle ">
      <h1 class="m0 sans-serif">
        {{ data.name }}
      </h1>
      <task-priority :value="data.priority" class="brdr-1 brdr-five px10 mx10" />
    </div>
    <div class="flex middle-xs between-xs brdr-bottom-1 py5 mb10">
      <div class="flex middle-xs">
        <task-status :value="data.status" class="mr5" />
        <span class="mr5">#{{ data.id }} открыт </span>
        <time>{{ data.date | timestamp }}</time>
      </div>
      <div>
        <span class="mr5">срок до</span>
        <time>{{ data.expires | timestamp }}</time>
      </div>
    </div>
    <form @submit.prevent="save">
      <fieldset class="brdr-none p0 m0">
        <base-textarea :value="data.description" :placeholder="`Описание`" ref="desc" />
        <div class="flex between-xs">
          <div>
            <label>Статус
              <select class="mx10" ref="selectStatus">
                <option v-for="(status,i) in statusArray" :value="i" :key="i" :selected="i === data.status">
                  {{ status }}
                </option>
              </select>
            </label>
            <label>Приоритет
              <select class="mx10" ref="selectPriority">
                <option v-for="(priority,i) in priorityArray" :value="i" :key="i" :selected="i === data.priority">
                  {{ priority }}
                </option>
              </select>
            </label>
            <label>
              срок до
              <input type="date" v-model="expires" required>
            </label>
          </div>
          <button-full class="col-xs-3" type="submit">
            Сохранить
          </button-full>
        </div>
      </fieldset>
    </form>
  </div>
  <h1 v-else>
    Не удалось загрузить задачу # {{ id }}
  </h1>
</template>

<script>
import TaskStatus from '@/modules/tasks/components/TaskStatus.vue'
import TaskPriority from '@/modules/tasks/components/TaskPriority.vue'
import BaseTextarea from '@/components/blocks/Form/BaseTextarea'
import Configurable from '@/mixins/Configurable'
import ButtonFull from '@/components/ButtonFull.vue'

export default {
  mixins: [Configurable],
  name: 'Task',
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data: () => ({ _expires: null, textarea: '' }),
  metaInfo () {
    return {
      title: this.data ? this.data.name : 'Задача',
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  computed: {
    data () {
      return this.$store.getters['tasks/taskById'](Number.parseInt(this.id))
    },
    expires: {
      get: function () {
        return new Date(this.data.expires * 1000).toISOString().slice(0, 10)
      },
      set: function (value) {
        this._expires = new Date(value).getTime()
      }
    },
  },
  methods: {
    save () {
      this.$bus.$on('task-saved', () => {
        this.$bus.$emit('notification-progress-stop', {})
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: 'Изменения успешно сохранены',
          action1: { label: 'OK' }
        })
      })
      this.$bus.$emit('notification-progress-start', 'Сохраняем...')
      this.$bus.$emit('task-changed', {
        'id': this.data.id,
        'name': this.data.name,
        'date': this.data.date,
        'description': this.$refs.desc.$el.querySelector('textarea').value,
        'priority': Number.parseInt(this.$refs.selectPriority.value),
        'status': Number.parseInt(this.$refs.selectStatus.value),
        'expires': this._expires
      })
    }
  },
  components: { BaseTextarea, TaskStatus, TaskPriority, ButtonFull },
}
</script>
