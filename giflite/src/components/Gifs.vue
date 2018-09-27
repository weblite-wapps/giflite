<template>
    <div v-if="ratios" class="app"> 
      <Gif
        v-for="(item, index) in gifurls"
        :key="item.gifId" 
        :url="item"
        :Send="Send"
        :Like="like"
        :scale="ratios[index]"
      />
    </div>
</template>

<script>
const R = require("ramda")
import Gif from "./Gif"
export default {
  name: "Gifs",
  props: {
    gifurls: {
      Type: Array,
      required: true,
    },
    Send: Function,
    like: Function,
    calscale: Function,
  },
  data() {
    return {
      ratios: {},
    }
  },
  components: {
    Gif,
  },

  watch: {
    gifurls() {
      const info = this.gifurls.map(x => parseInt(x.width))
      this.ratios = this.calscale(info)
    },
  },
}
</script>

<style scoped>
html,
body,
.app {
  height: 100%;
  margin: 0;
}
.app {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: center; */
}
</style>
