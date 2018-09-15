<template>
    <div>
        <Favourite
            v-for="item in favouriteList"
            :key="item.urlSmallSize"
            :url="item"
            :Send="SendToChat"

        />
    <button @click="changeState">go To Main</button>
        
    </div>    
</template>


<script>
import Favourite from "./Favourite"
export default {
  name: "Favourites",
  props: {
    showFavourites: Function,
    favouriteList: Array,
    SendToChat: Function,
  },
  methods: {
    init() {
      //   console.log("Fav page is created")
      this.showFavourites()
    },
    changeState(event) {
      this.$emit("state", "mainPage")
    },
  },
  created() {
    this.init()
  },
  components: {
    Favourite,
  },
}
</script>


<style>
</style>
