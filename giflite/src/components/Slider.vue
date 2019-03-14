<template>
  <div class="slider">
    <span class="send-icon">
      <i
        class="fa fa-share-square"
        @click="sendToChat( {id: url.gifId, wisId: url.wisId ? url.wisId: '' })"
      />
    </span>
    
    <span class="expand-icon">
      <i class="fas fa-expand-arrows-alt" @click="expand()"/>
    </span>
    
    <span class="save-icon" :style="saveCircleStyle">
      <i
        class="fa fa-bookmark"
        @click="addToFavourite({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '' })"
      />
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
    'save'
    'expand';
}
</style>