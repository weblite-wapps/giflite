<template>
  <div id="app">
    <div class="container">
      <Header
        :state="state" 
        :search="search"
        @changeState="changeState"
      />

      <Main
        v-if="state === 'main'"
        :search="search"
        :gifs="searchedGifs"
        :SendToChat="SendToChat"
        :AddToFavourite="AddToFavourite"
      />

      <Favourites
        v-if="state === 'favourites'"
        :getFavourites="getFavourites"
        :SendToChat="SendToChat"
        :gifs="favouriteGifs"
        :AddToFavourite="AddToFavourite"
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

  created() {
    this.getTrends()
    W && webliteHandler(this)
  },

  methods: {
    getTrends() { getTrendGifs().then(this.addUserIdToInfo.bind(this)) },

    search(query) {
      if (query) getSearchGifs(query).then(this.addUserIdToInfo.bind(this))
      else this.getTrends()
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

    getFavourites() {
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
