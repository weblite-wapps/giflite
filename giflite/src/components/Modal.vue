<template>
  <div class="main">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper" @click.self="$emit('close')">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <button class="modal-default-button" @click="$emit('close')">
                  <img src="../assets/close.png" alt="X">
                </button>
              </slot>
            </div>

            <div class="modal-body">
              <img :src="imgTagUrl" class="gif" alt>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button
                  v-if="parent=== 'Main'"
                  class="bookmark icon"
                  @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '', action: 'like' })"
                >
                  <img src="../assets/bookmark.svg">
                </button>
                
                <button
                  class="send icon"
                  @click="sendToChat( {id: url.gifId, wisId: url.wisId ? url.wisId: '' })"
                >
                  <img src="../assets/send.svg">
                </button>
                
                <button
                  v-if="parent=== 'Favourites'"
                  class="unbookmark icon"
                  @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '', action: 'dislike' })"
                >
                  <img src="../assets/unbookmark.png">
                </button>
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
  color: #ffffff;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-left: 20px;
  cursor: pointer;
  outline: none;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 340px;
  height: 100%;
  /* filter: blur(8px); */
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  background: rgb(0, 0, 0, 0.5);
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
  position: absolute;
  top: 25px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.modal-default-button img {
  width: 20px;
  height: 20px;
}

.bookmark {
  background: #b93ab4;
  display: block;
  height: 55px;
  width: 55px;
  padding: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  border: none;
}

.bookmark img {
  width: 25px;
  height: 20px;
}

.send {
  background: #02abe2;
  display: block;
  height: 55px;
  width: 55px;
  padding: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  border: none;
}

.send img {
  width: 21px;
  height: 18px;
}

.unbookmark {
  background: #41d36d;
  display: block;
  height: 55px;
  width: 55px;
  padding: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  border: none;
}

.unbookmark img {
  width: 20px;
  height: 24px;
}
</style>
