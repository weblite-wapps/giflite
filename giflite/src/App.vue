<template>
  <div id="app">
    <div class="container">
      <Header
        :state="state" 
        :search="search"
        :ShowTrend="ShowTrend"
        @changeState="changeState"
      />

      <Main
        v-if="state === 'main'"
        :search="search"
        :searchGifsUrls="searchedGifs"
        :SendToChat="SendToChat"
        :AddToFavourite="AddToFavourite"
        @tostate="changeState"
      />

      <Favourites
        v-if="state === 'favourites'"
        :showFavourites="showFavourites"
        :SendToChat="SendToChat"
        :favouriteList="favouriteGifs"
        :like="AddToFavourite"
        @tostate="changeState"
      />
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
import * as R from "ramda"

const { W } = window

export default {
  name: "app",

  data() {
    return {
      searchedGifs: [],
      favouriteGifs: [],
      userId: "javadId",
      state: "main",
    }
  },

  components: {
    Main,
    Favourites,
    Header,
  },

  created() { W && webliteHandler(this) },

  methods: {
    ShowTrend() { getTrendGifs().then(this.addUserIdToInfo.bind(this)) },

    search(query) {
      if (query) getSearchGifs(query).then(this.addUserIdToInfo.bind(this))
      else this.ShowTrend()
    },

    addUserIdToInfo(infos) {
      this.searchedGifs = infos.map(R.merge({ userId: this.userId }))
    },

    SendToChat({ id, wisId }) {
      W.sendMessageToCurrentChat("wapp", {
        wappId: "",
        wisId,
        customize: { id },
      })
    },

    AddToFavourite(info) { addToFav(info) },

    showFavourites() {
      getAllFavourites(this.userId).then(favouriteGifs => { this.favouriteGifs = favouriteGifs })
    },

    changeState(event) { this.state = event },
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
