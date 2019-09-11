<template>
  <div
    class="sans-serif weight-700 cl-white brdr-1 brdr-five fs-medium-small"
    :class="getPriorityColor(value)"
  >
    {{ getPriorityLabel(value) }}
  </div>
</template>

<script>
import Configurable from '@/mixins/Configurable'

export default {
  mixins: [Configurable],
  name: 'TaskPriority',
  props: {
    value: {
      required: true,
      type: Number,
    }
  }
}
</script>

<style scoped>
  div {
    height: 1.2em;
  }
</style>
