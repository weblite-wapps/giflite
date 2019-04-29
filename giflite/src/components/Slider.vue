<template>
  <div class="slider">
    <div class="box send-box" @click="sendToChat(url)">
      <img class="send-icon" src="../assets/send.svg">
    </div>

    <div class="box expand-box button" @click="expand">
      <img class="expand-icon button__inner" src="../assets/expand.svg">
    </div>

    <div
      class="box save-box"
      @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '', action: isLikeButton ? 'dislike' : 'like' })"
    >
      <img
        v-if="!isLikeButton"
        class="save-icon"
        :style="saveCircleStyle"
        src="../assets/bookmark.svg"
      >
      <img v-if="isLikeButton" class="icon span-icon save-icon" src="../assets/unbookmark.png">
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
  background-color: #b93ab4;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 40px; */
  height: 39.3px;
  width: 40px;
  cursor: pointer;
  outline: none;
}

.send-box {
  background-color: #02abe2;
}

.send-box:hover,
.send-box:active,
.save-box:hover,
.save-box:active,
.expand-box:hover,
.expand-box:active {
  opacity: 0.75;
  transition: opacity ease 0.5s;
}

.send-icon {
  width: 21px;
  height: 18px;
}

.save-box {
  background-color: #b93ab4;
}

.save-icon {
  width: 20px;
  height: 24px;
}

.expand-box {
  background-color: #6a6bc8;
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