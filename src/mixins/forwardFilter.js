export default {
  filters: {
    forwardClear: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.replace(/\(.*\)/, '')
    }
  }
}
