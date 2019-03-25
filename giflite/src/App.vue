<template>
  <div id="app">
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
</template>

<script>
import * as R from 'ramda'
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

const { W } = window
export default {
  name: 'app',

  data() {
    return {
      searchedGifs: [],
      favouriteGifs: [],
      userId: '',
      page: 'main',
      requestOffset: 0,
      searchQuery: '',
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
        this.searchQuery = ''
      })
    },

    searchContent(query, offset) {
      if (this.searchQuery != query) {
        this.requestOffset = 0
        this.searchedGifs = []
      }
      if (query) {
        getSearchGifs(query, offset).then(searchResult => {
          this.searchedGifs = R.concat(this.searchedGifs, searchResult)
          this.searchQuery = query
        })
      } else this.getTrends()
    },

    sendToChat({ id, wisId }) {
      W.sendMessageToCurrentChat('wapp', {
        wappId: '5c4c39afe50e46486b155fc9',
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
      if (this.searchQuery) {
        this.searchContent(this.searchQuery, ++this.requestOffset)
      } else this.getTrends(++this.requestOffset)
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Didact+Gothic');

body {
  margin: 0px;
}

#app {
  width: 350px;
  background-color: white;
  height: 100vh;
  overflow: hidden;
}

.content {
  height: 700px;
  overflow: auto;
  margin-top: 2px;
  overflow-x: hidden;
  box-shadow: 10px black;
  user-select: none;
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
