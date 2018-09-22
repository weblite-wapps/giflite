<template>
  <div id="app">
      <Gif
        :url="url"
        :Like="AddToFavourites"
      />
  </div>
</template>

<script>
import Gif from "./components/Gif"
import { addToFav, getSingleGifData, SaveToDb } from "./helper/requestHandler"
const { W } = window
export default {
  name: "App",
  data() {
    return {
      // wisId: (W && W.wisId) || "1",
      wisId: "giflite2",
      /// bara WisId kodoom doroste  ? balaie ya weblite.api
      //??
      //?
      //////////
      url: {},
      gifId: "7lD9Gz5FxpRCg",
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

    AddToFavourites(info) {
      // console.log("this.urlSmallSize: ", this.urlSmallSize)
      // console.log("this.urlBigSize: ", this.urlBigSize)
      // console.log(this.userId)
      // console.log(this.wisId)
      // const url = [this.urlSmallSize, this.urlBigSize, this.userId, this.wisId]
      // addToFav(url)
      // console.log(" added To Fav ")
    },
  },
}
</script>

<style>
#app {
}
</style>
