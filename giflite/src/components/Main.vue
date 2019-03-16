<template>
  <div class="main">
    <Gif
      v-for="(item, index) in gifs"
      :key="item.gifId"
      :url="item"
      :sendToChat="sendToChat"
      :changeUserLikes="changeUserLikes"
      :scale="ratios[index]"
      parent="Main"
    />
    <div @click="loadMore">Load More</div>
  </div>
</template>

<script>
import * as R from 'ramda'
import Gif from './Gif'
import { calculateScale } from './../helper/functions/helperFunctions'

export default {
  props: {
    gifs: {
      Type: Array,
      required: true,
    },
    sendToChat: Function,
    changeUserLikes: Function,
    loadMore: Function,
  },

  data() {
    return {
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
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
