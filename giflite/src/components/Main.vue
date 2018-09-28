<template>
  <div >
    <Gifs
      :gifurls="searchGifsUrls"
      :Send="SendToChat"
      :like="AddToFavourite"
    />
  </div>
</template>

<script>
import Gifs from "./Gifs"
export default {
  name: "Main",
  props: {
    searchGifsUrls: Array,
    SendToChat: Function,
    AddToFavourite: Function,
  },
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
