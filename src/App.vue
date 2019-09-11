<template>
  <div id="app">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </div>
</template>
<script>
const DefaultLayout = () => import('@/layouts/Default')

export default {
  components: {
    DefaultLayout,
  },
  beforeMount () {
    this.$bus.$on('session-after-nonauthorized', () => {
      this.$router.push('/login')
    })
  }
}
</script>
