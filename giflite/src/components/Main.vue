<template>
    <div >
      <Gifs
        :gifurls="searchGifsUrls"
        :Send="SendToChat"
        :like="AddToFavourite"
        :calscale="calscale" 
      />
    <!-- <button @click="changeState">To Fav</button> -->
    </div>
</template>
<script>
import Gifs from "./Gifs"

export default {
  name: "Main",
  props: {
    ShowTrend: Function,
    calscale: Function,
    // search: Function,
    searchGifsUrls: Array,
    SendToChat: Function,
    AddToFavourite: Function,
  },
  computed: {},
  components: {
    Gifs,
  },
  created() {
    this.ShowTrend()
    // console.log(" Main is created")
  },
  updated() {
    // console.log(" Main is updated")
  },
  mounted() {
    // console.log(" Main is mounted")
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
