<template>
  <div id="app" >
    <div class="container">
      <Header 
        :search="search"
        @state="changeState"
    />
      <Main
        v-if="state === 'mainPage' "
        :search="search"
        :ShowTrend="ShowTrend"
        :searchGifsUrls="searchedGifs"
        :SendToChat="SendToChat"
        :AddToFavourite="AddToFavourite"
        :calscale="calScale"
        @state="changeState"
      />
      <Favourites
        v-if="state === 'favouritesPage'"
        :showFavourites="showFavourites"
        :SendToChat="SendToChat"
        :favouriteList="favouriteGifs"
        :like="AddToFavourite"
        :calscale="calScale"
        @state="changeState"
      />
      <div  class="footer">
          <img class="footer-img"  src=".\assets\Poweredby_100px-White_VertText.png" alt="footerGif">
      </div>
    </div>
  </div>
</template>

<script>
import webliteHandler from "./helper/functions/weblite.api"
import {
  getTrendRes,
  getSearchRes,
  addToFav,
  getAllFavourites,
} from "./helper/functions/handleRequests.js"
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
    // !W &&
    this.init()
  },
  methods: {
    init() {
      getTrendRes().then(res => {
        if (res) {
          this.fillAddresses(res)
        }
      })
    },

    search(info) {
      getSearchRes(info).then(res => {
        if (res) {
          this.fillAddresses(res)
        }
      })
    },
    fillAddresses(info) {
      info.forEach(x => {
        x.userId = this.userId
      })
      this.searchedGifs = info
    },

    SendToChat(info) {
      console.log(info, "gif is sent to inline")
      //   W.sendMessageToCurrentChat("wapp", {
      //     wappId: "",
      //     customize: { gifId },
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
        if (res) {
          this.favouriteGifs = res
        }
      })
    },
    changeState(event) {
      this.state = event
      this.init
    },
    calScale(info) {
      return R.compose(
        ({ array, sum, count }) =>
          count ? R.concat(array, R.repeat(330 / sum, count)) : array,
        R.reduce(
          (acc, size) =>
            acc.sum + size > 330
              ? {
                  array: R.concat(
                    acc.array,
                    R.repeat(330 / acc.sum, acc.count),
                  ),
                  sum: size,
                  count: 1,
                }
              : { ...acc, sum: acc.sum + size, count: acc.count + 1 },
          { array: [], sum: 0, count: 0 },
        ),
      )(info)
      // console.log("cal scale is called")
    },
    ShowTrend() {
      this.init()
    },
  },
}
</script>

<style>
#app {
  /* border: 1px black solid; */

  width: 350px;
  height: 100vh;
  overflow-y: scroll;
  background-color: #5f5b5b;
  /* #eaeaea */
  /* border: 5px solid black; */
}
.footer {
  /* width: 300px; */
  justify-content: center;
}
.footer-img {
  margin-left: 34%;
  /* width: 40%; */
}
</style>
