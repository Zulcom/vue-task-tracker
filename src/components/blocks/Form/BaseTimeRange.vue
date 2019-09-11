<template>
  <input
    class="time-range-input"
    :id="getInputId"
    v-model="time"
    type="time"
    :disabled="disabled"
  >
</template>

<script>

export default {
  name: 'BaseTimeRange',
  data () {
    return {
      text: '',
    }
  },

  props: {
    value: {
      type: Object,
      default: () => ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true,
    }
  },
  beforeMount () {
    if (this.value.hours !== null && this.value.minutes !== null) {
      this.text = this.format_time()
    } else {
      this.text = '0:00'
    }
  },
  methods: {
    format_hours (value) {
      return value === null ? '00' : (value > 23 ? 23 : (value < 0 ? 0 : (value > 9 ? value : `0${value}`)))
    },
    format_mins (value) {
      return value === null ? '00' : (value > 59 ? 59 : (value < 0 ? 0 : (value > 9 ? value : `0${value}`)))
    },
    format_time () {
      return `${this.format_hours(this.value.hours)}:${this.format_mins(this.value.minutes)}`
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      if (newValue.hours !== null && newValue.minutes !== null) {
        this.text = this.format_time()
      } else {
        this.text = '0:00'
      }
    }
  },
  computed: {
    getInputId () {
      return `input_${this._uid}`
    },
    time: {
      get () {
        return this.text
      },
      set (value) {
        const tokens = value.split(':')
        const hours = Number.parseInt(tokens[0])
        const minutes = Number.parseInt(tokens[1])
        this.value.hours = Number.isNaN(hours) ? 0 : hours
        this.value.minutes = Number.isNaN(minutes) ? 0 : minutes
        this.text = this.format_time()
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  @import '@/css/variables/_colors.scss';
  @import '@/css/helpers/functions/_color.scss';

  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);
  .time-range-input{
    width: 85px;
    border:1px solid #d3d9de;
    border-radius: 2px;
    padding: 0 9px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    height: 30px;
    line-height: 14;
    margin-bottom: 0;
  }
</style>
