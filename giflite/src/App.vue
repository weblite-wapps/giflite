<template>
  <div id="app">
    <div class="container">
      <Main
        v-if="state === 'mainPage' "
        :search="search"
        :searchGifsUrls="searchedGifs"
        :SendToChat="SendToChat"
        :AddToFavourite="AddToFavourite"
        @state="changeState"
      />
      <Favourites
        v-if="state === 'favouritesPage'"
        :showFavourites="showFavourites"
        :SendToChat="SendToChat"
        :favouriteList="favouriteGifs"
        :like="AddToFavourite"
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
      searchedGifs: [],
      favouriteGifs: [],
      // favouriteGifsUrls: [],
      // gifSId: [],
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
        // console.log("res: ", res)
        // this.searchedGifs = res
        // console.log("typeof res[0]: ", typeof res[0])
        if (res) {
          this.fillAddresses(res)
        }
      })
    },

    search(info) {
      getSearchRes(info).then(res => {
        if (res) {
          // console.log("res: ", res)

          this.fillAddresses(res)
        }
      })
    },
    fillAddresses(info) {
      // console.log("info: ", info)
      info.forEach(x => {
        x.userId = this.userId
      })
      this.searchedGifs = info
      // console.log("search res: ", this.searchGifsUrls)
    },

    SendToChat(info) {
      console.log(info, "gif is sent to inline")
      //   W.sendMessageToCurrentChat("wapp", {
      //     wappId: "",
      //     customize: { urlSmallSize },
      // })
    },
    // send message to inline
    // },
    AddToFavourite(info) {
      addToFav(info).then(res => {
        if (res) {
          console.log(res)
        }
      })

      console.log("added to favourite")
      // send to db a message and save
    },
    showFavourites() {
      getAllFavourites(this.userId).then(res => {
        // console.log("user for getting favs: ", this.userId)

        if (res) {
          console.log("res for favs: ", res)
          this.favouriteGifs = res
          ////// Baadan Ramda ro pak kon && W.R
        }
      })
      // console.log("liked res: ", this.favouriteList)
      // console.log("liked res: ", this.favouriteList[0])
      // console.log("type liked res: ", typeof this.favouriteList)
    },
    changeState(event) {
      // console.log(`go to state ${event}`)
      this.state = event
      this.init
    },
  },
}
</script>

<style>
#app {
  width: 350px;
  height: 100%;
  overflow: auto;
  background-color: #5f5b5b;
  /* #eaeaea */
  /* border: 5px solid black; */
}
</style>
