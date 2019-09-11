<template>
  <div class="bg-cl-accent flex middle-xs p5 brdr-five cl-white">
    <i class="material-icons mr10">{{ getStatusIcon(value) }}</i>
    <span>{{ getStatusLabel(value) }}</span>
  </div>
</template>

<script>
import Configurable from '@/mixins/Configurable'

export default {
  mixins: [Configurable],
  name: 'TaskStatus',
  props: {
    value: {
      required: true,
      type: Number,
    }
  }
}
</script>

<style scoped>

</style>
