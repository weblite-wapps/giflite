<template>
  <div class="favourites">
    <Gif
      v-for="(item, index) in gifs"
      :key="item.smallUrl"
      :url="item"
      :sendToChat="sendToChat"
      :changeUserLikes="changeUserLikes"
      :scale="ratios[index]"
      parent="Favourites"
    />
  </div>
</template>

<script>
import Gif from './Gif'
import { calculateScale } from './../helper/functions/helperFunctions'

export default {
  data() {
    return {
      ratios: [],
    }
  },

  props: {
    getFavourites: Function,
    gifs: Array,
    sendToChat: Function,
    changeUserLikes: Function,
  },

  components: {
    Gif,
  },

  created() {
    this.getFavourites()
  },

  watch: {
    gifs() {
      const widths = this.gifs.map(({ width }) => parseInt(width))
      this.ratios = calculateScale(widths)
    },
  },
}
</script>

<style scoped>
.favourites {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

