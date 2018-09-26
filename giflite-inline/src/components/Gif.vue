<template>
  <div class="card">
    <div class="containter">
      <img class="save-btn" src=".\..\assets\download-button.png" alt="save place">
      <img :style="style" class="gif" :src="url.bigUrl" alt="image place">
    </div>
    <!-- <button v-on:click="Like">Like</button> -->
  </div>
</template>

<script>
const R = require("ramda")
export default {
  name: "Gif",
  props: {
    url: Object,
    Like: Function,
    calScale: Function,
  },
  computed: {
    style() {
      const rate = this.calScale({ x: this.url.width, y: this.url.height })
      // console.log("rate ", rate)
      // console.log("width: ", rate * this.url.width)
      return "width: " + rate * this.url.width + "px;"

      // return
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

  /* align-content: center; */
  /* margin-left: 100px; */
  position: relative;
  background-color: black;
}
.save-btn {
  position: absolute;
  box-sizing: content-box;
  bottom: 0;
  left: 0;
  /* right: 0px; */
  /* width: 350px;  */
  /* height: 100px; */
  /* width: 100px; */
  /* top: 100px; */
  /* left: 200px; */
  /* right: 50px; */
}
.gif {
  /* margin: auto; */
  box-sizing: content-box;
  /* width: 100%; */
  /* margin-top: 50%; */
  /* margin-bottom: 50%; */
  /* position: absolute; */
}
</style>
