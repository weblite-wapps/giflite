<template>
  <div class="main">
    <div ref="mainGifsPanel" class="gifs">
      <Gif
        v-for="(item, index) in gifs"
        :key="item.gifId"
        :url="item"
        :sendToChat="sendToChat"
        :changeUserLikes="changeUserLikes"
        :scale="ratios[index]"
        parent="Main"
      />
    </div>
    <button class="load-more" v-if="showLoadMoreButton" @click="loadMore">Load More</button>
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
      showLoadMoreButton: false,
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
  updated() {
    if (!this.showLoadMoreButton) {
      this.showLoadMoreButton = this.$refs['mainGifsPanel'].clientHeight > 400
    }
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
body {
  margin: 0;
}

.gifs {
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.load-more {
  width: 100%;
  height: 30px;
}
</style>
