<template>
    <div class="container">
        <div class="card">
            <img
              src="./../assets/tack-save-button.png"  
              class="btn-2" 
              v-on:click="Like( {gifId: url.gifId, userId: url.userId ,wisId: wisId} )"  
              alt="image place"
            >
            <img  
              class="btn-1" 
              v-on:click="Send(url.gifId)" 
              src="./../assets/send-button.png" 
              alt="image place"
            >
            <img 
              :src="gifurl"   
              alt="image place"
              :style="style"
              v-on:click="changeShow"
              :class="{ isShowing : play ,  hidden: !play }"
            >
            
        </div>
        <!-- <div class="gif-img-container">
          <img  class="img img-1" v-on:click="Like( {gifId: url.gifId, userId: url.userId ,wisId: wisId} )"  alt="image place">
          <img  class="img img-2" v-on:click="Send(url.wisId? url.wisId: wisId)" src="./../assets/send.png" alt="image place">
          <img  
            class="img"
            v-on:click="changeShow"
            :class="{ img_3 : play ,  img_3_disabled: !play }"
             src="./../assets/on.png" alt="image place">
        </div> -->
    </div>

</template>
<script>
export default {
  name: "Gif",
  data() {
    return {
      wisId: "wisId 3",
      play: false,
      gifurl: "",
    }
  },
  computed: {
    style() {
      // console.log("width main: " + parseInt(this.url.width))
      // console.log("width counted: " + this.scale * parseInt(this.url.width))
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
    // console.log("url ", this.url)
    this.gifurl = this.url.smallImage
  },
  updated() {
    // this.gifurl = url.smallImage
    // console.log("gif is updated")
  },
  watch: {
    url() {
      // console.log("url ", this.url)
    },
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
  /* border: 0.5px solid black; */
}

.btn-1 {
  position: absolute;
  box-sizing: content-box;
  bottom: 5px;
  left: 5px;
  height: 20px;
  width: 20px;
}
.btn-2 {
  position: absolute;
  box-sizing: content-box;
  bottom: 5px;
  left: 35px;
  height: 20px;
  width: 20px;
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
