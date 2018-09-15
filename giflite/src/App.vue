<template>
  <div id="app">
    <div class="container">
      <Main
        v-if="state === 'mainPage' "
        :search="search"
        :searchGifsUrls="searchGifsUrls"
        :SendToChat="SendToChat"
        :AddToFavourite="AddToFavourite"
        @state="changeState"
      />
      <Favourites
        v-if="state === 'favouritesPage'"
        :showFavourites="showFavourites"
        :SendToChat="SendToChat"
        :favouriteList="favouriteList"
        @state="changeState"
      />
    </div>
  </div>
</template>

<script>
import webliteHandler from "./helper/functions/weblite.api"
import {
  getSearchRes,
  addToFav,
  getAllFavourites,
} from "./helper/functions/handleRequests.js"
import Main from "./components/Main"
import Favourites from "./components/Favourites"
const { W } = window
const R = require("ramda")
export default {
  name: "app",

  data() {
    return {
      searchGifsUrls: [],
      favouriteList: [],
      // wisId: (W && W.wisId) || "1",
      userName: "",
      userId: "javadId",
      state: "mainPage",
    }
  },
  components: {
    Main,
    Favourites,
  },

  created() {
    W && webliteHandler(this)
    // !W &&
    this.init()
  },
  methods: {
    init() {
      getSearchRes().then(res => {
        // console.log("res[0]: ", res[0])
        // console.log("typeof res[0]: ", typeof res[0])
        if (res) {
          this.fillAddresses(res)
        }
      })
    },
    fillAddresses(info) {
      // console.log("info: ", info)

      this.searchGifsUrls = info.map(x => x.concat(this.userId))

      // console.log("info  2  : ", this.searchGifsUrls)

      // console.log("ccc")
      // console.log("aaaa", info[0])
      // console.log(this.searchGifsUrls)
      // console.log(typeof info)
      // console.log(info)
      // console.log(this.searchGifsUrls[0])
      // console.log("bbb")
    },
    search(info) {
      getSearchRes(info).then(res => {
        if (res) {
          this.fillAddresses(res)
        }
      })
    },
    SendToChat(info) {
      console.log("gif is sent to inline")
      //   W.sendMessageToCurrentChat("wapp", {
      //     wappId: "",
      //     customize: { urlSmallSize },
      // })
    },
    // send message to inline
    // },
    AddToFavourite(info) {
      addToFav(info)
      console.log("added to favourite")
      // send to db a message and save
    },
    showFavourites() {
      getAllFavourites(this.userId).then(res => {
        console.log("user for getting favs: ", this.userId)

        if (res) {
          console.log("res for favs: ", res)

          ////// Baadan Ramda ro pak kon && W.R
          this.favouriteList = R.map(
            ({ userId, wisId, urlSmallSize, urlBigSize }) => ({
              userId,
              wisId,
              urlSmallSize,
              urlBigSize,
            }),
            res,
          )
        }
      })
    },
    changeState(event) {
      console.log(`go to state ${event}`)
      this.state = event
      this.init
    },
  },
}
</script>

<style>
#app {
  width: 300px;
  height: 100%;
  overflow: auto;
  /* background-color: #14222f; */
  border: 5px solid black;
}
</style>
