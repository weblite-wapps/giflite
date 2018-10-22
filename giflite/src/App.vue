<template>
  <div id="app">
    <div class="container">
      <Header
        :page="page" 
        :searchContent="searchContent"
        @changePage="changePage"
      />

      <Main
        v-if="page === 'main'"
        :gifs="searchedGifs"
        :sendToChat="sendToChat"
        :addToFavourite="addToFavourite"
      />

      <Favourites
        v-if="page === 'favourites'"
        :getFavourites="getFavourites"
        :sendToChat="sendToChat"
        :gifs="favouriteGifs"
        :addToFavourite="addToFavourite"
      />
    </div>
    
  </div>
</template>

<script>
import webliteHandler from './helper/functions/weblite.api'
import {
  getTrendGifs,
  getSearchGifs,
  addToFav,
  getAllFavourites,
} from './helper/functions/requestHandler.js'
import Main from './components/Main'
import Favourites from './components/Favourites'
import Header from './components/Header'
import * as R from 'ramda'

const { W } = window
export default {
  name: 'app',

  data() {
    return {
      searchedGifs: [],
      favouriteGifs: [],
      userId: 'javadId',
      page: 'main',
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
    getTrends() {
      getTrendGifs().then(this.addUserIdToInfo.bind(this))
    },

    searchContent(query) {
      if (query) getSearchGifs(query).then(this.addUserIdToInfo.bind(this))
      else this.getTrends()
    },

    addUserIdToInfo(infos) {
      this.searchedGifs = infos.map(R.merge({ userId: this.userId }))
    },

    sendToChat({ id, wisId }) {
      W.sendMessageToCurrentChat('wapp', {
        wappId: '',
        wisId,
        customize: { id },
      })
    },

    addToFavourite(info) {
      addToFav(info)
    },

    getFavourites() {
      getAllFavourites(this.userId).then(favouriteGifs => {
        this.favouriteGifs = favouriteGifs
          ? R.reverse(favouriteGifs)
          : favouriteGifs
      })
    },

    changePage(event) {
      this.page = event
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
</style>
