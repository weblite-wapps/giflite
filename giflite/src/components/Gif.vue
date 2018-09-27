<template>
    <div class="container">
        <div class="card">
            <img
              src="./../assets/tack-save-button5.png"  
              class="btn btn-2" 
              @click="Like({ gifId: url.gifId, userId: url.userId, wisId: wisId })"  
              alt="image place"
            >
            <img  
              class="btn btn-1" 
              @click="Send(url.wisId)" 
              src="./../assets/send-button5.png" 
              alt="image place"
            >
            <img 
              :src="gifurl"   
              alt="image place"
              :style="style"
              @click="changeShow"
              :class="{ isShowing: play, hidden: !play }"
            >
        </div>
    </div>

</template>
<script>
export default {
  name: "Gif",
  data() {
    return {
      wisId: "gif wisId",
      play: false,
      gifurl: "",
    }
  },
  computed: {
    style() {
      return "width: " + this.scale * parseInt(this.url.width) + "px"
    },
  },
  props: {
    url: Object,
    Like: Function,
    Send: Function,
    scale: Number,
  },
  methods: {
    changeShow() {
      console.log("show is changing")
      this.play = !this.play
      this.gifurl = this.play ? this.url.smallUrl : this.url.smallImage
    },
  },
  created() {
    this.gifurl = this.url.smallImage
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
