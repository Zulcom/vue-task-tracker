<template>
  <div class="default-layout">
    <overlay v-if="overlayActive" />
    <loader />
    <div id="viewport" class="w-100 relative">
      <main-header v-if="isLoggedIn" />
      <slot />
      <main-footer v-if="isLoggedIn" />
      <notification />
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Overlay from '@/components/Overlay.vue'
import Loader from '@/components/Loader.vue'
import Notification from '@/components/Notification.vue'
import MainHeader from '@/components/blocks/header/Header.vue'
import MainFooter from '@/components/Footer.vue'
import Head from '@/compatibility/head-meta'

export default {
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay,
    }),
    isLoggedIn () {
      return this.$store.getters['user/isLoggedIn']
    },
  },

  beforeMount () {
    // Progress bar on top of the page
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      this.$Progress.increase(40)
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },
  metaInfo: Head,
  components: {
    Overlay,
    Loader,
    Notification,
    MainHeader,
    MainFooter,
  }
}
</script>

<style lang="scss" src="@/css/main.scss"></style>
