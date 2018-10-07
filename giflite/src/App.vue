<template>
  <div id="app">
    <div class="container">
      <Header
        :state="state" 
        :search="search"
        :ShowTrend="ShowTrend"
        @tostate="changeState"
      />
      <Main
        v-if="state === 'mainPage'"
        :search="search"
        :searchGifsUrls="searchedGifs"
        :SendToChat="SendToChat"
        :AddToFavourite="AddToFavourite"
        @tostate="changeState"
      />
      <Favourites
        v-if="state === 'favouritesPage'"
        :showFavourites="showFavourites"
        :SendToChat="SendToChat"
        :favouriteList="favouriteGifs"
        :like="AddToFavourite"
        @tostate="changeState"
      />
      <div class="footer">
        <img class="footer-img" src=".\assets\Poweredby_100px-White_VertText.png" alt="footerGif">
      </div>
    </div>
  </div>
</template>

<script>
import webliteHandler from "./helper/functions/weblite.api"
import {
  getTrendGifs,
  getSearchGifs,
  addToFav,
  getAllFavourites,
} from "./helper/functions/requestHandler.js"
import Main from "./components/Main"
import Favourites from "./components/Favourites"
import Header from "./components/Header"
const { W } = window
const R = require("ramda")
export default {
  name: "app",

  data() {
    return {
      searchedGifs: [],
      favouriteGifs: [],
      userName: "",
      userId: "javadId",
      state: "mainPage",
    }
  },
  components: {
    Main,
    Favourites,
    Header,
  },

  created() {
    W && webliteHandler(this)
  },
  methods: {
    ShowTrend() {
      getTrendGifs().then(res => {
        if (res) this.fillGifUrlAddresses(res)
      })
    },
    search(info) {
      if (info) {
        getSearchGifs(info).then(res => {
          if (res) this.fillGifUrlAddresses(res)
        })
      } else this.ShowTrend()
    },
    fillGifUrlAddresses(info) {
      console.log("info in fill ", info)

      this.searchedGifs = info.map(gifObj =>
        R.merge(gifObj, { userId: this.userId }),
      )
      console.log("searchedGifs ", this.searchedGifs)
    },

    SendToChat(info) {
      const { id, wisId } = info

      W.sendMessageToCurrentChat("wapp", {
        wappId: "",
        wisId: wisId,
        customize: { id },
      })
    },
    AddToFavourite(info) {
      addToFav(info)
    },
    showFavourites() {
      getAllFavourites(this.userId).then(res => {
        if (res) this.favouriteGifs = res
      })
    },
    changeState(event) {
      if (this.state !== event) this.state = event
    },
  },
}
</script>

<style>
#app {
  width: 350px;
  height: 100vh;
  overflow-y: scroll;
  background-color: #5f5b5b;
  border: 5px solid #2b303b;
  bottom: 20px;
}
.footer {
  justify-content: center;
}
.footer-img {
  margin-left: 34%;
}
</style>
