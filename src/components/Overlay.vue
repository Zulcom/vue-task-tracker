<template>
  <div class="overlay fixed w-100" @click="close" v-if="isVisible" />
</template>

<script>

export default {
  name: 'Overlay',
  computed: {
    isVisible () {
      return this.$store.state.ui.overlay
    }
  },
  beforeCreate () {
    document.documentElement.classList.add('no-scroll')
  },
  destroyed () {
    document.documentElement.classList.remove('no-scroll')
  },
  methods: {
    close () {
      this.$store.commit('ui/setOverlay', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/css/variables/_colors.scss';
  @import '@/css/helpers/functions/_color.scss';
  @import '@/css/base/_global_vars.scss';
  $color-bg: color(black);
  $z-index-overlay: map-get($z-index, overlay);

  .overlay {
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba($color-bg, 0.4);
    z-index: $z-index-overlay;
  }
</style>
