<template>
  <div >
    <Gifs
      :gifurls="searchGifsUrls"
      :Send="SendToChat"
      :like="AddToFavourite"
      :calscale="calscale" 
    />
  </div>
</template>

<script>
import Gifs from "./Gifs"
export default {
  name: "Main",
  props: {
    calscale: Function,
    searchGifsUrls: Array,
    SendToChat: Function,
    AddToFavourite: Function,
  },
  computed: {},
  components: {
    Gifs,
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
