<template>
  <div class="gif">
    <div class="card" @mouseover="mouseOver" @mouseleave="mouseLeave" @click="download">
      <Slider
        :class="{ isShowing: downloaded, hidden: !downloaded }"
        class="slider"
        v-if="downloaded && showSlider"
        :sendToChat="sendToChat"
        :changeUserLikes="changeUserLikes"
        :expand="expand"
        :url="url"
        :parent="parent"
      />
      <span class="download-icon" :class="{ isShowing: !downloaded, hidden: downloaded }">
        <img src="../assets/download.png">
      </span>
      <div class="imgDiv" :style="widthStyle">
        <img :src="imgTagUrl" alt="image place" :style="gifStyle">
      </div>

      <Modal
        v-if="showModal"
        :url="url"
        :sendToChat="sendToChat"
        :changeUserLikes="changeUserLikes"
        :parent="parent"
        @close="showModal = false"
      ></Modal>
    </div>
  </div>
</template>
<script>
import Slider from "./Slider.vue";
import Modal from "./Modal.vue";

export default {
  name: "Gif",

  props: {
    url: Object,
    changeUserLikes: Function,
    sendToChat: Function,
    parent: String,
    scale: Number
  },

  data() {
    return {
      showSlider: false,
      downloaded: false,
      showModal: false
    };
  },

  components: {
    Slider,
    Modal
  },

  computed: {
    widthStyle() {
      var width = this.scale * parseInt(this.url.width);
      return `height: 120px; width: ${width - 2}px;`;
    },
    gifStyle() {
      var height = this.scale * parseInt(this.url.height);
      var width = this.scale * parseInt(this.url.width);
      if (height > 120) {
        return `height: ${height}px; width: ${width}px;`;
      } else {
        return `height: 120px; width: ${width}px;`;
      }
    },
    imgTagUrl() {
      return `https://giflite.herokuapp.com/load/content?url=${
        this.url[this.downloaded ? "smallUrl" : "smallImage"]
      }`;
    }
  },

  methods: {
    mouseOver() {
      this.showSlider = true;
    },
    mouseLeave() {
      this.showSlider = false;
    },
    download() {
      this.downloaded = true;
    },
    expand() {
      this.showModal = true;
    }
  }
};
</script>
<style scoped>
.gif {
  display: flex;
  grid-template-areas: "a b", "c d";
  position: relative;
  height: 120px;
  /* margin-inline-start: 3px; */
}

.imgDiv {
  overflow: hidden;
  border: 1px white solid;
}

.slider {
  height: 100%;
  width: 40px;
  right: 0;
  top: 0;
  bottom: 0;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.download-icon {
  box-sizing: content-box;
  position: absolute;
}

.hidden {
  box-sizing: content-box;
  opacity: 0;
}

.isShowing {
  box-sizing: content-box;
  opacity: 1;
}

.icon {
  color: #4f5b66;
}
</style>
