<template>
  <div class="container" v-if=" ratios">
    <Gif
      v-for="(item, index) in favouriteList"
      :key="item.smallUrl"
      :url="item"
      :Send="SendToChat"
      :Like="like"
      :scale="ratios[index]"
    />

    <!-- <button @click="changeState">go To Main</button> -->
        
  </div>
</template>

<script>
import Gif from "./Gif"
export default {
  name: "Favourites",
  data() {
    return {
      ratios: [],
    }
  },
  props: {
    calscale: Function,
    showFavourites: Function,
    favouriteList: Array,
    SendToChat: Function,
    like: Function,
  },
  methods: {
    init() {
      //   console.log("Fav page is created")
      this.showFavourites()
    },
    changeState(event) {
      this.$emit("state", "mainPage")
    },
  },
  created() {
    this.init()
  },
  components: {
    Gif,
  },
  watch: {
    favouriteList() {
      const info = this.favouriteList.map(x => parseInt(x.width))
      // console.log("info", info)

      this.ratios = this.calscale(info)
      // console.log("ratios ", this.ratios)
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

