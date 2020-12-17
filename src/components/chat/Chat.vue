<template>
  <div>
    <p>Chat works</p>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendMessage() {
      this.$store.dispatch('socketOnConnection', {msg: 'sosa', id: '5f6c45a73bb925175c84f6d8'})
    }
  }
}
</script>

<style>

</style>