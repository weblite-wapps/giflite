<template>
  <div class="bookmarks">
    <Gif
      v-for="(item, index) in gifs"
      :key="item.smallUrl"
      :url="item"
      :sendToChat="sendToChat"
      :changeUserLikes="changeUserLikes"
      :scale="ratios[index]"
      parent="Bookmarks"
    />
  </div>
</template>

<script>
// helpers
import { calculateScale } from './../helper/functions/helperFunctions'
// lazy loading
const Gif = () => import('./Gif')

export default {
  data() {
    return {
      ratios: [],
    }
  },

  props: {
    getBookmarks: Function,
    gifs: Array,
    sendToChat: Function,
    changeUserLikes: Function,
  },

  components: {
    Gif,
  },

  created() {
    this.getBookmarks()
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
.bookmarks {
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

