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
      // wisId: (W && W.wisId) || "1",
      wisId: "inline wisId",
      /// bara WisId kodoom doroste  ? balaie ya weblite.api
      //??
      //?
      //////////
      url: {},
      gifId: "ylyUQmZkAhf2nnF1ba",
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
    console.log("updated")
    SaveToDb({ gifId: this.gifId, wisId: this.wisId }).then(res =>
      console.log("res ", res),
    )
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
      addToFav(info).then(res => {
        if (res) {
          console.log("res ", res)
        }
      })
    },
    calScale(info) {
      console.log("cal info  ", info)

      return info.x < info.y
        ? 350 / info.y
        : info.y < info.x ? 350 / info.x : 350 / info.x
      // console.log("scale ", scale)
    },
  },
}
</script>

<style>
#app {
  width: 350px;
}
</style>
