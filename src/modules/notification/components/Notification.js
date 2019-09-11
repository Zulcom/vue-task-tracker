export const Notification = {
  name: 'Notification',
  computed: {
    notifications () {
      return this.$store.getters['notification/notifications']
    }
  }
}
