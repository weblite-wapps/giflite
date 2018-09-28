<template>
  <div class="container" v-if=" ratios">
    <Gif
      v-for="(item, index) in favouriteList"
      :key="item.smallUrl"
      :url="item"
      :Send="SendToChat"
      :Like="like"
      :scale="ratios[index]"
    />
  </div>
</template>

<script>
import Gif from "./Gif"
import { calculateScale } from "./../helper/functions/helperFunctions"
export default {
  name: "Favourites",
  data() {
    return {
      ratios: [],
    }
  },
  props: {
    showFavourites: Function,
    favouriteList: Array,
    SendToChat: Function,
    like: Function,
  },
  methods: {
    changeState(event) {
      this.$emit("state", "mainPage")
    },
  },
  created() {
    this.showFavourites()
  },
  components: {
    Gif,
  },
  watch: {
    favouriteList() {
      const widths = this.favouriteList.map(gifObj => parseInt(gifObj.width))
      this.ratios = calculateScale(widths)
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

