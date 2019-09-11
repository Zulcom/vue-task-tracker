<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      Авторизация
    </header>
    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <form @submit.prevent="login">
        <base-input
          class="mb35"
          type="username"
          name="username"
          focus
          v-model="username"
          placeholder="Email"
        />
        <base-input
          class="mb35"
          type="password"
          name="password"
          v-model="password"
          placeholder="Пароль"
        />
        <button-full class="mb20" type="submit" data-testid="loginSubmit">
          Вход
        </button-full>
      </form>
    </div>
  </div>
</template>

<script>
import { Logger } from '@/lib/Logger'
import ButtonFull from '@/components/ButtonFull.vue'
import BaseInput from '../Form/BaseInput.vue'

export default {
  name: 'Login',

  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    callLogin () {
      this.$bus.$emit('notification-progress-start', 'Входим...')
      this.$store.dispatch('user/login', { username: this.username, password: this.password }).then((result) => {
        if (!result) {
          this.$bus.$emit('notification-progress-stop')
          this.onFailure()
        }
      }).catch(err => {
        Logger.error(err, 'user')()
        this.$bus.$emit('notification-progress-stop')
      })
    },
    login () {
      this.callLogin()
    },

    onFailure () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: 'Вы ввели неверное имя пользователя или пароль',
        action1: { label: 'OK' }
      })
    }
  },
  components: {
    ButtonFull,
    BaseInput,
  },
  beforeMount () {
    if (this.$store.getters['user/current']) {
      this.$router.push('/')
    }
    this.$bus.$on('user-after-login', () => {
      this.$bus.$emit('notification-progress-stop', {})
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: 'Вы успешно авторизировались!',
        action1: { label: 'OK' }
      })
      this.$router.push('/')
    })
  }
}
</script>

<style lang="scss" scoped/>
