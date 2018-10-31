<template>
  <div id="app">
    <Gif
      :gifInfos="gifInfos"
      :addToFavourites="addToFavourites"
    />
  </div>
</template>

<script>
const R = require('ramda')
import Gif from './components/Gif'
import { addToFav, getSingleGifData, saveToDb } from './helper/requestHandler'
const { W } = window
export default {
  name: 'App',
  data() {
    return {
      wisId: W && W.wisId,
      gifInfos: {},
      gifId: '',
      userId: '',
    }
  },
  components: {
    Gif,
  },

  created() {
    getSingleGifData(this.gifId).then(receivedUrls => {
      this.gifInfos = receivedUrls
    })
  },
  mounted() {
    saveToDb({ gifId: this.gifId, wisId: this.wisId })
  },

  methods: {
    addToFavourites() {
      addToFav({ gifId: this.gifId, userId: this.userId, wisId: this.wisId })
    },
  },
}
</script>

<style>
#app {
  width: 350px;
}
</style>
