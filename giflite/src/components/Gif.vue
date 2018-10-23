<template>
  <div class="gif">
    <div class="card">

      <span
        class="span-icon save-icon"
        :style="saveCircleStyle"
      >
        <i
          class="fa fa-bookmark icon"
          @click="addToFavourite({ gifId: url.gifId, userId: url.userId, wisId: url.wisId ? url.wisId: '' })"
        />
      </span
      >

      <span 
        class="span-icon send-icon"
      >
        <i
          class="fa fa-share-square icon"
          @click="sendToChat( {id: url.gifId, wisId: url.wisId ? url.wisId: '' })"
        />
      </span>
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
  name: 'Gif',

  props: {
    url: Object,
    addToFavourite: Function,
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
    saveCircleStyle() {
      return `display: ${this.parent === 'Favourites' ? 'none' : 'inline'}`
    },
  },

  methods: {
    toggleShow() {
      this.play = !this.play
    },
  },
  watch: {
    parent: () => {
      console.log('parent: ', parent)
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
