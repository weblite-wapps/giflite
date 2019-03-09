<template>
  <div class="gif">
    <div class="card">
      <span v-if="play && !isLikeButton" class="span-icon save-icon">
        <i
          class="fa fa-bookmark icon"
          @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: 'no wis', action: 'like' })"
        />
      </span>
      
      <span v-if="play && isLikeButton" class="span-icon save-icon">
        <i
          class="fa fa-home icon"
          @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: 'no wis', action: 'dislike' })"
        />
      </span>
      <span v-if="play" class="span-icon send-icon">
        <i
          class="fa fa-share-square icon"
          @click="sendToChat( {id: url.gifId, wisId: url.wisId ? url.wisId: '' })"
        />
      </span>
      <img
        :src="imgTagUrl"
        :style="widthStyle"
        @click="toggleShow"
        :class="{ isShowing: play, hidden: !play }"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Gif',

  props: {
    url: Object,
    changeUserLikes: Function,
    sendToChat: Function,
    scale: Number,
    parent: String,
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
    imgTagUrl() {
      return `https://giflite.herokuapp.com/load/content?url=${
        this.url[this.play ? 'smallUrl' : 'smallImage']
      }`
    },
    isLikeButton() {
      return this.parent === 'Favourites'
    },
  },

  methods: {
    toggleShow() {
      this.play = !this.play
    },
  },
}
</script>
<style scoped>
.gif {
  display: flex;
  position: relative;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.span-icon {
  padding-left: 5px;
  background-color: #2b303b;
  border: 4px solid #2b303b;
  border-radius: 100px;
}

.send-icon {
  position: absolute;
  box-sizing: content-box;
  bottom: 5px;
  left: 5px;
  height: 18px;
  width: 18px;
  opacity: 1;
}
.save-icon {
  position: absolute;
  box-sizing: content-box;
  bottom: 5px;
  left: 40px;
  height: 18px;
  width: 18px;
}

.hidden {
  box-sizing: content-box;
  opacity: 0.7;
}
.isShowing {
  box-sizing: content-box;
  opacity: 1;
}

.icon {
  color: #4f5b66;
}

.icon:active {
  opacity: 0.6;
}
</style>
