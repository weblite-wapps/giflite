<template>
  <div id="app">
      <Gif
        :url="urlBigSize"
        :Like="AddToFavourites"
      />
  </div>
</template>

<script>
import Gif from "./components/Gif"
import { addToFav, getSingleGifData } from "./helper/requestHandler"
const { W } = window
export default {
  data() {
    return {
      // wisId: (W && W.wisId) || "1",
      wisId: "giflite2",
      /// bara WisId kodoom doroste  ? balaie ya weblite.api
      //??
      //?
      //////////
      urlSmallSize: "https://media1.giphy.com/media/lUgQ43SWw0EQ8/100w.gif",
      urlBigSize: "",
      userId: "javadId",
    }
  },
  components: {
    Gif,
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      getSingleGifData(this.wisId).then(res => {
        if (res) {
          console.log("res: ", res)

          this.urlSmallSize = res[0].urlSmallSize
          this.urlBigSize = res[0].urlBigSize
          this.userId = res[0].userId
          this.wisId = res[0].wisId
        }
        // console.log("res ", res)
      })
    },
    AddToFavourites(info) {
      console.log("this.urlSmallSize: ", this.urlSmallSize)
      console.log("this.urlBigSize: ", this.urlBigSize)
      console.log(this.userId)
      console.log(this.wisId)

      const url = [this.urlSmallSize, this.urlBigSize, this.userId, this.wisId]
      addToFav(url)
      console.log(" added To Fav ")
    },
  },
}
</script>

<style>
#app {
}
</style>
