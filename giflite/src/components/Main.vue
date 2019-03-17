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
    <button class="load-more" @click="loadMore">Load More</button>
    <!-- <vmodal v-ref:modal1 @click="this.show" name="hello-world">hello, world!</vmodal> -->
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
    show() {
      this.$refs.modal1.show('this is a message from javad')
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

.load-more {
  width: 330px;
}
</style>
