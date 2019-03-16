<template>
  <div class="slider">
    <span class="send-icon">
      <img
        @click="sendToChat( {id: url.gifId, wisId: url.wisId ? url.wisId: '' })"
        src="../assets/send.svg"
      >
    </span>
    
    <span class="expand-icon">
      <img @click="expand()" src="../assets/expand.svg">
    </span>
    
    <span class="save-icon" :style="saveCircleStyle">
      <img
        @click="addToFavourite({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '' })"
        src="../assets/bookmark.svg"
      >
    </span>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    url: Object,
    addToFavourite: Function,
    sendToChat: Function,
    parent: String,
  },
  computed: {
    saveCircleStyle() {
      return `display: ${this.parent === 'Favourites' ? 'none' : 'inline'}`
    },
  },
}
</script>

<style scoped>
img {
  margin-left: 5px;
  margin-top: 6px;
  width: 30px;
  height: 30px;
}
.send-icon {
  box-sizing: content-box;
  background-color: #2e6aeb;
  grid-area: send;
}
.save-icon {
  box-sizing: content-box;
  background-color: #790097;
  grid-area: save;
}
.expand-icon {
  box-sizing: content-box;
  background-color: #3c00ac;
  grid-area: expand;
}

.slider {
  display: grid;
  position: absolute;
  height: 100%;
  z-index: 10;
  grid-template-columns: auto;
  grid-template-rows: 40px 40px 40px;
  justify-self: stretch;
  align-self: stretch;
  grid-template-areas:
    'send'
    'expand'
    'save';
}
</style>