<template>
  <div id="app">
    <input  v-model="search" type="text">
    <button @click="send(search)">click</button>
  </div>
</template>

<script>
import { getSearchRes, requests } from "./helper/functions/handleRequests.js"

export default {
  name: "app",
  data: function() {
    return {
      search: "",
    }
  },
  components: {},

  methods: {
    send(info) {
      getSearchRes(info).then(res => {
        console.log(res)
      })
    },
  },
}
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
