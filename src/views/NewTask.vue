<template>
  <div class="container">
    <form @submit.prevent="save">
      <fieldset class="brdr-none p0 m0">
        <base-input
          class="mb35"
          type="username"
          name="username"
          focus
          required
          v-model="name"
          placeholder="Название"
        />
        <base-textarea v-model="textarea" :placeholder="`Описание`" ref="desc" />
        <div class="flex between-xs">
          <div>
            <label>Статус
              <select class="mx10" ref="selectStatus" v-model="status" required>
                <option v-for="(status,i) in statusArray" :value="i" :key="i">
                  {{ status }}
                </option>
              </select>
            </label>
            <label>Приоритет
              <select class="mx10" ref="selectPriority" v-model="priority" required>
                <option v-for="(priority,i) in priorityArray" :value="i" :key="i">
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
</template>

<script>

import BaseInput from '@/components/blocks/Form/BaseInput.vue'
import BaseTextarea from '@/components/blocks/Form/BaseTextarea'
import ButtonFull from '@/components/ButtonFull.vue'
import Configurable from '@/mixins/Configurable'

export default {
  mixins: [Configurable],
  name: 'NewTask',
  data: () => ({ expires: null, textarea: '', status: null, priority: null, name: '' }),
  metaInfo () {
    return {
      title: this.data ? this.data.name : 'новая задача',
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  methods: {
    save () {
      this.$bus.$on('task-after-add', () => {
        this.$bus.$emit('notification-progress-stop', {})
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: 'Новая задача добавлена',
          action1: { label: 'OK' }
        })
      })
      this.$bus.$emit('notification-progress-start', 'Сохраняем...')
      this.$bus.$emit('task-before-add', {
        'name': this.name,
        'date': new Date().getTime() / 1000,
        'description': this.textarea,
        'priority': this.priority,
        'status': this.status,
        'expires': new Date(this.expires).getTime() / 1000
      })
    }
  },
  components: { BaseTextarea, BaseInput, ButtonFull },
}
</script>
