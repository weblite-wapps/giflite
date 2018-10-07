<template>
  <div class="container">
    <Gif
      v-for="(item, index) in gifs"
      :key="item.smallUrl"
      :url="item"
      :Send="SendToChat"
      :like="AddToFavourite"
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
    getFavourites: Function,
    gifs: Array,
    SendToChat: Function,
    AddToFavourite: Function,
  },
  
  components: {
    Gif,
  },

  created() { this.getFavourites() },

  watch: {
    gifs() {
      const widths = this.gifs.map(({ width }) => parseInt(width))
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

