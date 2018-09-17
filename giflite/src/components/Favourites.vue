<template>
  <div>
    <Gif
      v-for="item in favouriteList"
      :key="item[0]"
      :url="item"
      :Send="SendToChat"
      :Like="like"
    />


    <button @click="changeState">go To Main</button>
        
  </div>
</template>

<script>
import Gif from "./Gif"
export default {
  name: "Favourites",
  props: {
    showFavourites: Function,
    favouriteList: Array,
    SendToChat: Function,
    like: Function,
  },
  methods: {
    init() {
      //   console.log("Fav page is created")
      this.showFavourites()
    },
    changeState(event) {
      this.$emit("state", "mainPage")
    },
  },
  created() {
    this.init()
  },
  components: {
    Gif,
  },
}
</script>

<style scoped>
</style>
