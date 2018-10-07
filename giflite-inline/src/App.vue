<template>
  <div id="app">
    <Gif
      :url="url"
      :Like="AddToFavourites"
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
      wisId: "22",
      url: {},
      gifId: "3oAt2dA6LxMkRrGc0g",
      userId: "javadId",
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
        if (res) this.url = res
      })
    },
    AddToFavourites() {
      const info = { gifId: this.gifId, userId: this.userId, wisId: this.wisId }
      addToFav(info)
    },
  },
}
</script>

<style>
#app {
  width: 350px;
}
</style>
