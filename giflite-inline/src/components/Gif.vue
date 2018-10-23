<template>
  <div class="gif-card">
    <div class="containter">
      <div class="save">
        <div class="img_overlay"/>
        <i 
          class="fa fa-bookmark save-btn"
          v-on:click="addToFavourites"
        />
      </div>
      <img 
        :style="style" 
        v-on:click="toggleShow" 
        class="gif" 
        :src="gifurl" 
        alt="image place"
      >
    </div>
  </div>
</template>

<script>
import { calculateScales } from './../helper/helperFunctions'
const R = require('ramda')
export default {
  name: 'Gif',
  data() {
    return {
      gifurl: '',
      play: false,
    }
  },
  props: {
    gifInfos: Object,
    addToFavourites: Function,
  },
  computed: {
    style() {
      const { width, height } = this.gifInfos
      return `width: ${calculateScales({ width, height }) * width}px;`
    },
  },
  watch: {
    gifInfos() {
      this.gifurl = `https://giflite.herokuapp.com/load/content?url=${
        this.gifInfos.bigImage
      }`
    },
  },
  methods: {
    toggleShow() {
      this.play = !this.play
      this.gifurl = `https://giflite.herokuapp.com/load/content?url=${
        this.play ? this.gifInfos.bigUrl : this.gifInfos.bigImage
      }`
    },
  },
}
</script>

<style scoped>
.containter {
  display: flex;
  position: relative;
}

.gif-card {
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: black;
}
.save-btn {
  background-color: #2b303b;
  position: absolute;
  box-sizing: content-box;
  bottom: 1px;
  left: 2px;
  border: 5px solid #2b303b;
  border-radius: 8px;
  color: #4f5b66;
}
.save-btn:active {
  opacity: 0.6;
}
.gif {
  box-sizing: content-box;
}
</style>
