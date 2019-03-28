<template>
  <div class="gif-card">
    <template v-if="!!gifurl">
      <img :style="style" v-on:click="toggleShow" class="gif" :src="gifurl" alt="image place">
      <i class="fa fa-bookmark save-btn" v-on:click="addToFavourites"/>
    </template>
    <Loading v-else/>
  </div>
</template>

<script>
import Loading from "./Loading";
import { calculateScales } from "./../helper/helperFunctions";
const R = require("ramda");

export default {
  name: "Gif",

  data() {
    return {
      gifurl: "",
      play: true
    };
  },

  components: {
    Loading
  },

  props: {
    gifInfos: Object,
    addToFavourites: Function
  },

  computed: {
    style() {
      const { width } = this.gifInfos;
      return `width: ${calculateScales({ width }) * width}px;`;
    }
  },

  watch: {
    gifInfos() {
      this.gifurl = `https://giflite.herokuapp.com/load/content?url=${
        this.gifInfos.bigUrl
      }`;
    }
  },

  methods: {
    toggleShow() {
      this.play = !this.play;
      this.gifurl = `https://giflite.herokuapp.com/load/content?url=${
        this.play ? this.gifInfos.bigUrl : this.gifInfos.bigImage
      }`;
    }
  }
};
</script>

<style scoped>
.gif-card {
  margin: 0px;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: black;
  overflow: hidden;
}

.save-btn {
  background-color: #2b303b;
  position: fixed;
  box-sizing: content-box;
  bottom: 10px;
  left: 10px;
  border: 5px solid #2b303b;
  border-radius: 8px;
  color: white;
  /* color: black; */
}

.save-btn:active {
  opacity: 0.6;
}

.gif {
  box-sizing: content-box;
}
</style>
