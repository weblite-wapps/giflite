<template>
  <div class="main">
    <div ref="mainGifsPanel" class="gifs">
      <Gif
        v-for="(item, index) in filteredGifs"
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
    this.showLoadMoreButton = this.$refs['mainGifsPanel'].clientHeight > 400
  },

  computed: {
    filteredGifs() {
      return this.gifs.filter(gif => gif.smallUrl !== '')
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
.gifs {
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.load-more {
  width: 100%;
  height: 50px;
  padding-bottom: 10px;
  display: inline-block;
  padding: 15px;
  margin-right: 5px;
  height: 50px;
  min-width: 100px;
  background: rgb(208,64,202);
  background: linear-gradient(90deg, rgba(208,64,202,1) 0%, rgba(0,192,255,1) 100%);
  border: none;
  outline: none;
  color: white;
  font-family: inherit;
  font-weight: 400;
  font-size: 20px;
  border-radius: 3px;
  box-shadow: 0 5px 0px #348aa7;
  border-bottom: 2px solid #30809b;
  cursor: pointer;
}
.load-more:hover {
  background: rgb(208,64,202);
  background: linear-gradient(-90deg, rgba(208,64,202,1) 0%, rgba(0,192,255,1) 100%);
  box-shadow: 0 4px 1px #2e7a94;
  border-bottom: 2px solid #2a7088;
  transition: all 0.1s ease-in;
}
.load-more:active {
  transform: translateY(4px);
  border-bottom-width: 2px;
  box-shadow: none;
}
</style>
