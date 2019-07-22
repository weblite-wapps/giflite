<template>
  <div class="main">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper" @click.self="$emit('close')">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <button class="modal-default-button" @click="$emit('close')">
                  <img src="../assets/close.png" alt="X" />
                </button>
              </slot>
            </div>

            <div class="modal-body">
              <div id="gif-wrapper">
                <img :src="imgTagUrl" class="gif" alt />
              </div>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <abbr title="Bookmark">
                  <button
                    v-if="parent=== 'Main'"
                    class="bookmark icon"
                    @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '', action: 'like' })"
                  >
                    <img src="../assets/bookmark.svg" />
                  </button>
                </abbr>

                <abbr title="Unbookmark">
                  <button
                    v-if="parent=== 'Favourites'"
                    class="unbookmark icon"
                    @click="changeUserLikes({ gifId: url.gifId, wisId: url.wisId ? url.wisId: '', action: 'dislike' })"
                  >
                    <img src="../assets/unbookmark.png" />
                  </button>
                </abbr>

                <abbr title="Send in chat">
                  <button class="send icon" @click="sendToChat(url)">
                    <img src="../assets/send.svg" />
                  </button>
                </abbr>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import config from '../config'

const { server } = config

var modal = document.getElementsByClassName('modal-mask')

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

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
      return `${server}/load/content?url=${
        this.url[this.play ? 'smallUrl' : 'smallImage']
      }`
    },
  },
}
</script>

<style scoped>
#gif-wrapper {
  width: 100%;
  height: 100%;
  padding: 0% 15%;
  align-content: center;
}

.gif {
  width: 70%;
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
  width: 100%;
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
  width: 100%;
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
  height: 15vmin;
  width: 15vmin;
  max-width: 70px;
  max-height: 70px;
  padding: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  border: none;
}

.bookmark:hover,
.bookmark:active,
.send:hover,
.send:active,
.unbookmark:hover,
.unbookmark:active .modal-default-button:hover,
.modal-default-button:active {
  opacity: 0.75;
  transition: opacity ease 0.5s;
}

.bookmark img {
  width: 6vmin;
  height: 4vmin;
  max-width: 15px;
  max-height: 20px;
}

.send {
  background: #02abe2;
  display: block;
  height: 15vmin;
  width: 15vmin;
  max-height: 70px;
  max-width: 70px;
  padding: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  border: none;
}

.send img {
  width: 6vmin;
  height: 4vmin;
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
