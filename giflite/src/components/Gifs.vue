<template>
    <div class="conatainer"> 
        <Gif
            v-for="item in gifurls"
            :key="item[0]"
            :url="item"
            :Send="Send"
            :Like="like"

        />
    </div>
    
</template>

<script>
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
    // console.log("aaa", this.gifurls)
    // const info = this.gifurls.map(x => x[0])
    // console.log("bbb ", info)
    // countRates(this.gifurls)
  },
  methods: {
    // countRates(info) {
    //   const rateResults = find(info)
    // },
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
