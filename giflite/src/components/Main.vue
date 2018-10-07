<template>
  <div class="container"> 
    <Gif
      v-for="(item, index) in gifs"
      :key="item.gifId" 
      :url="item"
      :SendtoChat="SendtoChat"
      :like="AddtoFavourite"
      :scale="ratios[index]"
    />
  </div>
</template>

<script>
import * as R from "ramda"
import Gif from "./Gif"
import { calculateScale } from "./../helper/functions/helperFunctions"

export default {
  name: "Main",

  props: {
    gifs: {
      Type: Array,
      required: true,
    },
    SendtoChat: Function,
    AddtoFavourite: Function,
  },

  data() {
    return {
      ratios: {},
    }
  },

  components: {
    Gif,
  },

  mounted() { this.calculateRatios() },

  watch: {
    gifs() { this.calculateRatios() },
  },

  methods: {
    calculateRatios() {
      const gifsWidth = this.gifs.map(({ width }) => parseInt(width))
      this.ratios = calculateScale(gifsWidth)
    }
  },
}
</script>

<style scoped>
html, body, .container {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
