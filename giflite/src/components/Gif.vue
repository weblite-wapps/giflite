<template>
  <div class="container">
    <div class="card">
      <!-- TODO: icon -->
      <img
        v-if="!url.wisId"              
        src="./../assets/tack-save-button5.png"  
        class="btn btn-2"
        @click="like({ gifId: url.gifId, userId: url.userId, wisId: url.wisId ? url.wisId: ' ' })"  
        alt="image place"
      >
      <img  
        class="btn btn-1"
        @click="Send( {id: url.gifId, wisId: url.wisId ? url.wisId: ' ' })" 
        src="./../assets/send-button5.png" 
        alt="image place"
      >
      <img 
        :src="imgTagUrl"   
        alt="image place"
        :style="widthStyle"
        @click="toggleShow"
        :class="{ isShowing: play, hidden: !play }"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Gif",

  props: {
    url: Object,
    like: Function,
    Send: Function,
    scale: Number,
  },

  data() {
    return {
      play: false,
    }
  },

  computed: {
    widthStyle() {
      return `width: ${this.scale * parseInt(this.url.width)}px`
    },

    imgTagUrl() { return this.url[this.play ? 'smallUrl' : 'smallImage'] },
  },

  methods: {
    toggleShow() { this.play = !this.play },
  },
}
</script>
<style scoped>
.container {
  display: flex;
  position: relative;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-1 {
  position: absolute;
  box-sizing: content-box;
  bottom: 5px;
  left: 5px;
  height: 18px;
  width: 18px;
  opacity: 1;
}
.btn-2 {
  position: absolute;
  box-sizing: content-box;
  bottom: 5px;
  left: 35px;
  height: 18px;
  width: 18px;
}

.btn {
  background-color: #2b303b;
  border: 4px solid #2b303b;
  border-radius: 100px;
}

.hidden {
  box-sizing: content-box;
  opacity: 0.8;
}
.isShowing {
  box-sizing: content-box;
  opacity: 1;
}
</style>
