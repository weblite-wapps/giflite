<template>
  <div id="app">
    <div class="container">
      <Header :send="send"/>
      <Gifs :gifurls="gifUrls"/>
    </div>
  </div>
</template>

<script>
import webliteHandler from "./helper/functions/weblite.api"
import { getSearchRes } from "./helper/functions/handleRequests.js"
import Header from "./components/Header"
import Gifs from "./components/Gifs"

const { W } = window

export default {
  name: "app",
  userName: "",
  userId: "",

  data: function() {
    return {
      gifUrls: [],
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
      console.log("ccc")
      console.log(typeof this.gifUrls)
      console.log(this.gifUrls)
      console.log(this.gifUrls[0])
      console.log("bbb")
    },
    send(info) {
      getSearchRes(info).then(res => {
        if (res) {
          // console.log(res)
          this.fillAddresses(res)
        }
      })
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
