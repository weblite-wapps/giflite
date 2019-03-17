<template>
  <div class="main">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <button @click="$emit('close')" class="modal-default-button">X</button>
              </slot>
            </div>

            <div class="modal-body">
              <img :src="imgTagUrl" class="gif" alt>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <span
                  class="icon"
                  @click="sendToChat( {id: url.gifId, wisId: url.wisId ? url.wisId: '' })"
                >
                  <img src="../assets/send.svg">
                </span>
                
                <span class="icon">
                  <img
                    @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '', action: 'like' })"
                    src="../assets/bookmark.svg"
                  >
                </span>
                
                <span class="icon">
                  <i
                    class="fa fa-home icon"
                    @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '', action: 'dislike' })"
                  />
                </span>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as R from 'ramda'

export default {
  props: {
    url: Object,
    changeUserLikes: Function,
    sendToChat: Function,
    parent: String,
    expand: Function,
  },

  data() {
    return {
      play: true,
    }
  },

  methods: {
    nothing() {},
  },
  computed: {
    imgTagUrl() {
      return `https://giflite.herokuapp.com/load/content?url=${
        this.url[this.play ? 'smallUrl' : 'smallImage']
      }`
    },
  },
}
</script>

<style scoped>
.gif {
  width: 340px;
}

.icon {
  width: 30px;
  height: 30px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 340px;
  height: 100%;
  /* filter: blur(8px); */
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 340px;
  margin: 0px auto;
  /* padding: 20px 30px; */
  /* background-color: #fff; */
  border-radius: 2px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  margin: 0px 20px 20px 20px;
}
.modal-footer {
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
