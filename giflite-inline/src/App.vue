<template>
  <div id="app">
      <Gif
        :url="url"
        :Like="AddToFavourites"
        :calScale="calScale"
      />
  </div>
</template>

<script>
const R = require("ramda")
import Gif from "./components/Gif"
import { addToFav, getSingleGifData, SaveToDb } from "./helper/requestHandler"
const { W } = window
export default {
  name: "App",
  data() {
    return {
      wisId: W && W.wisId,
      url: {},
      gifId: "",
      userId: "",
    }
  },
  components: {
    Gif,
  },
  created() {
    this.init()
  },
  updated() {
    SaveToDb({ gifId: this.gifId, wisId: this.wisId })
  },

  methods: {
    init() {
      getSingleGifData(this.gifId).then(res => {
        if (res) {
          this.url = res
        }
      })
    },
    AddToFavourites() {
      const info = { gifId: this.gifId, userId: this.userId, wisId: this.wisId }
      addToFav(info)
    },
    calScale(info) {
      return info.x < info.y
        ? 350 / info.y
        : info.y < info.x ? 350 / info.x : 350 / info.x
    },
  },
}
</script>

<style>
#app {
  width: 350px;
}
</style>
