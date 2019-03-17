<template>
  <div class="preview">
    <div class="info-panel"></div>
    <div class="img-panel" :style="widthStyle">
      <img :src="imgTagUrl" alt="image place" :style="gifStyle">
    </div>
    <div class="button-panel"></div>
  </div>
</template>
<script>
export default {
  name: 'Preview',

  props: {
    url: Object,
    changeUserLikes: Function,
    sendToChat: Function,
    parent: String,
  },

  data() {
    return {}
  },

  components: {},

  computed: {
    imgTagUrl() {
      return `https://giflite.herokuapp.com/load/content?url=${
        this.url[this.downloaded ? 'smallUrl' : 'smallImage']
      }`
    },
  },

  methods: {},
}
</script>
<style scoped>
.gif {
}

.preview {
}
</style>
