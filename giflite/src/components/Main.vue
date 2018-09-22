<template>
    <div>
    <Header :search="search"/>
      <Gifs 
        :gifurls="searchGifsUrls"
        :Send="SendToChat"
        :like="AddToFavourite" 
      />
    <button @click="changeState">go To</button>
    </div>
</template>
<script>
import Header from "./Header"
import Gifs from "./Gifs"

export default {
  name: "Main",
  props: {
    search: Function,
    searchGifsUrls: Array,
    SendToChat: Function,
    AddToFavourite: Function,
  },
  components: {
    Header,
    Gifs,
  },
  created() {
    // console.log(" Main is created")
  },
  updated() {
    // console.log(" Main is updated")
  },
  methods: {
    changeState() {
      this.$emit("state", "favouritesPage")
    },
  },
}
</script>


<style>
</style>
