<template>
  <div>
    <img :src="url" alt="img place">
    <button v-on:click="Like">Like</button>
  </div>
</template>

<script>
export default {
  name: "Gif",
  props: {
    url: String,
    Like: Function,
  },
}
</script>

<style scoped>
.btn-cls {
  /* display: none; */
}
</style>
