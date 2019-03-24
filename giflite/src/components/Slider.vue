<template>
  <div class="slider">
      <div class="send-box" @click="sendToChat( {id: url.gifId, wisId: url.wisId ? url.wisId: '' })">
        <img
          class="send-icon"  
          src="../assets/send.svg"
        >
      </div>

      <div class="expand-box" @click="expand">
        <img class="expand-icon"  src="../assets/expand.svg">
      </div> 

      <div class="save-box" @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '', action: isLikeButton ? 'dislike' : 'like' })">
        <img
          v-if="!isLikeButton" class="save-icon" :style="saveCircleStyle"
          src="../assets/bookmark.svg"
        >
        <img
          v-if="isLikeButton"
          class="icon span-icon save-icon"
          src="../assets/unbookmark.png"
        >
      </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    url: Object,
    changeUserLikes: Function,
    sendToChat: Function,
    parent: String,
    expand: Function,
  },
  computed: {
    saveCircleStyle() {
      return `display: ${this.parent === 'Favourites' ? 'none' : 'inline'}`
    },
    isLikeButton() {
      return this.parent === 'Favourites'
    },
  },
}
</script>

<style scoped>
.box {
   box-sizing: content-box;
}
.send-box {
  box-sizing: content-box;
  background-color: #02ABE2;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 40px; */
  height: 39.3px;
  width: 40px;
  cursor: pointer;
  outline: none;
}

.send-icon {
  width: 21px;
  height: 18px;
}


.save-box {
  box-sizing: content-box;
  background-color: #B93AB4;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 40px; */
  height: 39.3px;
  width: 40px;
  cursor: pointer;
  outline: none;
}

.save-icon {
  width: 20px;
  height: 24px;
}

.expand-box {
  box-sizing: content-box;
  background-color: #6A6BC8;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 40px; */
  height: 39.3px;
  width: 40px;
  cursor: pointer;
  outline: none;
}

.expand-icon {
  width: 24px;
  height: 24px;
}

.slider {
  display: flex;
  position: absolute;
  height: 100%;
  z-index: 10;
  flex-direction: column;
  margin-top: 1px;
  margin-right: 1px;
}

i {
  color: #ffffff;
}
</style>