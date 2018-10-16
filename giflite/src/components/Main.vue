<template>
  <div class="main"> 
    <Gif
      v-for="(item, index) in gifs"
      :key="item.gifId" 
      :url="item"
      :sendToChat="sendToChat"
      :addToFavourite="addToFavourite"
      :scale="ratios[index]"
      :parent="name"
    />
  </div>
</template>

<script>
import * as R from "ramda"
import Gif from "./Gif"
import { calculateScale } from "./../helper/functions/helperFunctions"

export default {
  props: {
    gifs: {
      Type: Array,
      required: true,
    },
    sendToChat: Function,
    addToFavourite: Function,
  },

  data() {
    return {
      name: "Main",
      ratios: {},
    }
  },

  components: {
    Gif,
  },

  mounted() {
    this.calculateRatios()
  },

  watch: {
    gifs() {
      this.calculateRatios()
    },
  },

  methods: {
    calculateRatios() {
      const gifsWidth = this.gifs.map(({ width }) => parseInt(width))
      this.ratios = calculateScale(gifsWidth)
    },
  },
}
</script>

<style scoped>
html,
body,
.main {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
