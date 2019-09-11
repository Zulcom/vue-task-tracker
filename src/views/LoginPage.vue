<template>
  <div class="row center-md">
    <div class="brdr-1 mt20 " style="width: 600px">
      <login />
    </div>
  </div>
</template>

<script>
import Login from '@/components/blocks/Auth/Login.vue'

export default {
  name: 'LoginPage',
  components: {
    Login,
  }
}
</script>

<style scoped>
</style>
