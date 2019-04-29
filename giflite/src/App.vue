<template>
  <div id="app">
    <Header :page="page" :searchContent="searchContent" @changePage="changePage"/>

    <div class="content" v-if="searchedGifs.length || favouriteGifs.length">
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

    <Loading v-else/>
  </div>
</template>

<script>
// modules
import * as R from "ramda";
// helpers
import {
  getTrendGifs,
  getSearchGifs,
  changeLikes,
  getAllFavourites
} from "./helper/functions/requestHandler.js";
import webliteHandler from "./helper/functions/weblite.api";
import { removeGif } from "./helper/functions/helperFunctions";
// components
import Loading from "./components/Loading";
// lazy loading
const Header = () => import('./components/Header')
const Main = () => import('./components/Main')
const Favourites = () => import('./components/Favourites')



const { W } = window;
export default {
  name: "app",

  data() {
    return {
      searchedGifs: [],
      favouriteGifs: [],
      userId: "",
      page: "main",
      requestOffset: 0,
      searchQuery: ""
    };
  },

  components: {
    Main,
    Favourites,
    Header,
    Loading
  },

  created() {
    this.getTrends(this.requestOffset);
    W && webliteHandler(this);
  },

  methods: {
    getTrends(offset) {
      getTrendGifs(offset).then(searchResult => {
        this.searchedGifs = R.concat(this.searchedGifs, searchResult);
        this.searchQuery = "";
      });
    },

    searchContent(query, offset) {
      if (this.searchQuery != query) {
        this.requestOffset = 0;
        this.searchedGifs = [];
      }
      if (query) {
        getSearchGifs(query, offset).then(searchResult => {
          this.searchedGifs = R.concat(this.searchedGifs, searchResult);
          this.searchQuery = query;
        });
      } else this.getTrends();
    },

    sendToChat({ gifId, wisId, width }) {
      W.sendMessageToCurrentChat("wapp", {
        wappId: "5c4c39afe50e46486b155fc9",
        wisId,
        customize: {
          gifId
        },
        height: parseInt((100 * 320) / parseInt(width)),
        width: 320
      });
      W.analytics("SEND_TO_CHAT", { from: this.page })
    },

    changeUserLikes(info) {
      changeLikes({ ...info, userId: this.userId });
      if (info.action === "dislike") {
        this.favouriteGifs = removeGif(info.gifId, this.favouriteGifs);
      }
      W && W.analytics(info.action === "dislike" ? "UN_BOOKMARK": "BOOKMARK")
    },

    getFavourites() {
      getAllFavourites(this.userId).then(favouriteGifs => {
        this.favouriteGifs = favouriteGifs;
      });
    },

    changePage(event) {
      this.page = event;
      W && W.analytics("CHANGE_PAGE", { to: this.page })
    },

    loadMore() {
      if (this.searchQuery) {
        this.searchContent(this.searchQuery, ++this.requestOffset);
      } else this.getTrends(++this.requestOffset);
      W && W.analytics("LOAD_MORE_CLICK")
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Didact+Gothic");

body {
  margin: 0px;
}

#app {
  width: 100%;
  background-color: white;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content {
  height: 100%;
  overflow-x: hidden;
  box-shadow: 10px black;
  user-select: none;
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
