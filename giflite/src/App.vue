<template>
  <div id="app">
    <div class="container">
      <Header
        :page="page" 
        :searchContent="searchContent"
        @changePage="changePage"
      />
      
      <div class="content">
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
      userId: '',
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
      getTrendGifs().then(searchResult => {
        this.searchedGifs = searchResult
      })
    },

    searchContent(query) {
      if (query)
        getSearchGifs(query).then(searchResult => {
          this.searchedGifs = searchResult
        })
      else this.getTrends()
    },

    sendToChat({ id, wisId }) {
      W.sendMessageToCurrentChat('wapp', {
        wappId: '',
        wisId,
        customize: { id },
      })
    },

    addToFavourite(info) {
      addToFav({ ...info, userId: this.userId })
    },

    getFavourites() {
      getAllFavourites(this.userId).then(favouriteGifs => {
        this.favouriteGifs = favouriteGifs
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
  width: 340px;
  background-color: #5f5b5b;
  border: 5px solid #2b303b;
  bottom: 20px;
}

.content {
  height: 100vh;
  overflow: auto;
}

.content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555555;
}

.content::-webkit-scrollbar {
  width: 10px;
  background-color: #555555;
}

.content::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #555555;
}
</style>
