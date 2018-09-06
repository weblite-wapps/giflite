<template>
  <div id="app">
    <div class="container">
      <Header :search="search"/>
      <Gifs 
        :gifurls="gifUrls"
        :Send="SendToChat"
        :like="AddToFavourite"  
      />
    </div>
  </div>
</template>

<script>
import webliteHandler from "./helper/functions/weblite.api"
import { getSearchRes, addToFav } from "./helper/functions/handleRequests.js"
import Header from "./components/Header"
import Gifs from "./components/Gifs"

const { W } = window

export default {
  name: "app",

  data: function() {
    return {
      gifUrls: [],
      wisId: (W && W.wisId) || "1",
      userName: "",
      userId: "uuuuuuserId",
    }
  },
  components: {
    Header,
    Gifs,
  },

  created() {
    W && webliteHandler(this)
    // !W &&
    this.init()
  },
  methods: {
    init() {
      getSearchRes().then(res => {
        if (res) {
          this.fillAddresses(res)
        }
      })
    },
    fillAddresses(info) {
      this.gifUrls = info.map(x => x)
      // console.log("ccc")
      // console.log(typeof this.gifUrls)
      // console.log(this.gifUrls)
      // console.log(this.gifUrls[0])
      // console.log("bbb")
    },
    search(info) {
      getSearchRes(info).then(res => {
        if (res) {
          this.fillAddresses(res)
        }
      })
    },
    SendToChat(info) {
      console.log("gif is sent to inline")
      //   W.sendMessageToCurrentChat("wapp", {
      //     wappId: "",
      //     customize: { imageName },
      // })
    },
    // send message to inline
    // },
    AddToFavourite(info) {
      addToFav({ userId: this.userId, wisId: this.wisId, info })
      console.log("added to favourite")
      // send to db a message and save
    },
  },
}
</script>

<style>
#app {
  width: 300px;
  height: 100%;
  overflow: auto;
  background-color: #14222f;
  border: 5px solid black;
}
</style>
