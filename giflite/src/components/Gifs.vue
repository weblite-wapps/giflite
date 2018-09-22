<template>
    <div class="conatainer"> 
        <Gif
            v-for="item in gifurls"
            :key="item.smallUrl"
            :url="item"
            :Send="Send"
            :Like="like"
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
      Type: Object,
      required: true,
    },
    Send: Function,
    like: Function,
  },
  components: {
    Gif,
  },
  updated() {
    // console.log("gifs updated ", this.gifurls)
    const info = this.gifurls.map(x => parseInt(x.width))
    // console.log(info)
  },
  methods: {
    CalScale(info) {},
  },
}
</script>


<style scoped>
.conatainer {
  /* height: 600px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-content: flex-start; */
}
</style>
