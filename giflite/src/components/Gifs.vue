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
  created() {
    // console.log("created gifurls", this.gifurls)
  },
  watch: {
    gifurls() {
      // const u = this.gifurls.map(x => x.smallUrl)
      // console.log("urls ", u)
      // console.log("lolo 1")

      const info = this.gifurls.map(x => parseInt(x.width))
      // console.log("info1: ", info)
      // console.log("lolo 2")

      this.ratios = this.calscale(info)
      // console.log("lolo 3")

      // console.log("info2: ", info)
      // console.log("ratios ", this.ratios.array)
    },
  },
  methods: {
    ////////////////////////
    //////////////////////
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
.wrapper {
  /* flex: auto; */
}
</style>
