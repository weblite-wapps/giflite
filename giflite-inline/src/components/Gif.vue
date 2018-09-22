<template>
  <div>
    <img :src="url.bigUrl" alt="image place">
    <button v-on:click="Like">Like</button>
  </div>
</template>

<script>
export default {
  name: "Gif",
  props: {
    url: Object,
    Like: Function,
  },
  created() {},
}
</script>

<style scoped>
.btn-cls {
  /* display: none; */
}
</style>
