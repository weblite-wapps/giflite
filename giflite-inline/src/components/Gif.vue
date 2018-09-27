<template>
  <div class="card">
    <div class="containter">
    <div class="save">
      <div class="img_overlay"></div>
      <img 
        src="./../assets/tack-save-button5.png"
        v-on:click="Like"
        class="save-btn"
        alt="save place"
      >
    </div>
      <img 
        :style="style" 
        v-on:click="changeShow" 
        class="gif" 
        :src="gifurl" 
        alt="image place"
      >
    </div>
  </div>
</template>

<script>
const R = require("ramda")
export default {
  name: "Gif",
  data() {
    return {
      gifurl: "",
      play: false,
    }
  },
  props: {
    url: Object,
    Like: Function,
    calScale: Function,
  },
  computed: {
    style() {
      const rate = this.calScale({ x: this.url.width, y: this.url.height })
      return "width: " + rate * this.url.width + "px;"

      // return
    },
  },
  watch: {
    url() {
      this.gifurl = this.url.bigImage
    },
  },
  methods: {
    changeShow() {
      this.play = !this.play
      this.gifurl = this.play ? this.url.bigUrl : this.url.bigImage
    },
  },
}
</script>

<style scoped>
.containter {
  display: flex;
  position: relative;
}

.card {
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
}

.gif {
  box-sizing: content-box;
}
</style>
