<template>
  <div id="app">
    <div class="container">
      <Header :page="page" :searchContent="searchContent" @changePage="changePage"/>

      <div class="content">
        <Main
          v-if="page === 'main'"
          :gifs="searchedGifs"
          :sendToChat="sendToChat"
          :changeUserLikes="changeUserLikes"
          :loadMore="loadMore"
        />

        <Favourites
          v-if="page === 'favourites'"
          :getFavourites="getFavourites"
          :sendToChat="sendToChat"
          :gifs="favouriteGifs"
          :changeUserLikes="changeUserLikes"
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
  changeLikes,
  getAllFavourites,
} from './helper/functions/requestHandler.js'
import { removeGif } from './helper/functions/helperFunctions'
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
      requestOffset: 0,
    }
  },

  components: {
    Main,
    Favourites,
    Header,
  },

  created() {
    this.getTrends(this.requestOffset)
    W && webliteHandler(this)
  },

  methods: {
    getTrends(offset) {
      getTrendGifs(offset).then(searchResult => {
        this.searchedGifs = R.concat(this.searchedGifs, searchResult)
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
        wappId: '5c4c5d0d8b27391860c92c6c',
        wisId,
        customize: { id },
      })
    },

    changeUserLikes(info) {
      changeLikes({ ...info, userId: this.userId })
      if (info.action === 'dislike') {
        this.favouriteGifs = removeGif(info.gifId, this.favouriteGifs)
      }
    },

    getFavourites() {
      getAllFavourites(this.userId).then(favouriteGifs => {
        this.favouriteGifs = favouriteGifs
      })
    },

    changePage(event) {
      this.page = event
    },

    loadMore() {
      this.getTrends(++this.requestOffset)
    },
  },
}
</script>

<style>
body {
  margin: 0px;
}
#app {
  width: 340px;
  background-color: white;
  /* border: 5px solid #2b303b; */
  /* bottom: 20px; */
  /* height: 100vh; */
  /* overflow: hidden; */
}

.content {
  height: 100vh;
  overflow: auto;
  margin-top: 2px;
}

.content::-webkit-scrollbar-track {
  background-color: #ffffff;
}

.content::-webkit-scrollbar {
  width: 10px;
  background-color: #ffffff;
  border-radius: 20px;
}

.content::-webkit-scrollbar-thumb {
  background-color: #c9c9c9;
  border-radius: 40px;
  border: 2px solid #ffffff;
}

.content::-webkit-scrollbar-thumb:hover {
  border: 0px solid #ffffff;
}
</style>
