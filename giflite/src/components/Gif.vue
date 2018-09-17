<template>
    <div class="container">
        <div class="card-content gif">
          <img 
            :src="url[0]"   
            alt="image place"
            :class="{hidden: !canShow, isShowing: canShow}"
          >
        </div>
        <!-- <div class="gif-img-container">
          <img  class="img img-1" v-on:click="Like( url.concat(wisId) )"  alt="image place">
          <img  class="img img-2" v-on:click="Send" src="./../assets/send.png" alt="image place">
          <img  
            class="img"
            v-on:click="changeShow"
            :class="{ img_3 : canShow ,  img_3_disabled: !canShow }"
             src="./../assets/on.png" alt="image place">
        </div> -->
    </div>

</template>
<script>
export default {
  name: "Gif",
  data() {
    return {
      wisId: "giflite2",
      canShow: true,
    }
  },
  props: {
    url: Array,
    Like: Function,
    Send: Function,
  },
  methods: {
    changeShow() {
      console.log("show is changing")
      this.canShow = !this.canShow
    },
  },
}
</script>
<style scoped>
.container {
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  align-items: center;
  /* flex-grow: 1; */
  /* padding-top: 0.5%; */
}

.gif-img-container {
  display: flex;
  flex-direction: column;
}

.img {
  /* margin-top: 2px; */
  /* margin-left: 2px; */
  height: 10px;
  width: 10px;
  /* border-radius: 2px; */

  /* background: black; */
}

.img-1 {
  /* margin-top: 5px; */
  /* background-color: black; */
  content: url("./../assets/like.png");
}

.img-2 {
  /* margin-top: 10px; */
}

.img_3 {
  /* margin-top: 10px; */
  content: url("./../assets/on.png");
}
.img_3_disabled {
  /* margin-top: 10px; */
  content: url("./../assets/off.png");
}

.hidden {
}
.isShowing {
  /* height: 40px; */
  /* width: 100px; */
}
</style>
