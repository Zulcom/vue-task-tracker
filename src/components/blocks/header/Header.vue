<template>
  <header class="w-100 bg-cl-secondary mb20">
    <div class="container px15">
      <div class="row between-xs middle-xs">
        <h1 class="m0">
          <a href="/" class="no-underline">Task Tracker</a>
        </h1>
        <div class="">
          {{ currentUser.username }}
          <button class="brdr-none bg-cl-transparent" type="button" @click="logout">
            (Выйти)
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  components: {},
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  methods: {
    logout () {
      this.$bus.$emit('user-before-logout')
    },
  }
}
</script>
