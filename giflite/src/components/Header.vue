<template>
  <div class="container">
    <div class="left-side">
      <Input v-if="isSearching" :searchContent="searchContent" />

      <div class="logo-container" v-if="!isSearching">
        <img src="../assets/logo.png" alt="Gif Lite">
        <p class="logo-text">GIFLITE</p>
      </div>
    </div>

    <div class="right-side">
      <img
        class="button"
        v-if="!isSearching && page === 'main'"
        src="../assets/bookmark.svg"
        @click="changePage"
      />
      <img
        class="button"
        v-if="!isSearching && page === 'favourites'"
        src="../assets/home.svg" 
        @click="changePage"
      />
      <img
        class="button search"
        src="../assets/search.svg"
        @click="toggleSearch"
      />
    </div>
  </div>
</template>

<script>
// lazy loading
const Input = () => import("./Input")

const { W } = window

export default {
  name: 'Header',

  props: {
    searchContent: Function,
    page: String,
  },

  components: {
    Input,
  },

  data() {
    return {
      isSearching: false,
    }
  },

  methods: {
    changePage() {
      if (this.page === 'main') this.$emit('changePage', 'favourites')
      else this.$emit('changePage', 'main')
    },

    toggleSearch() {
      this.isSearching = !this.isSearching
      W && W.analytics("SEARCH_CLICK")
    },
  },
}
</script>

<style scoped>
.container {
  background: rgb(208,64,202);
  background: linear-gradient(90deg, rgba(208,64,202,1) 0%, rgba(0,192,255,1) 100%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  padding: 0px 10px;
}

.left-side {
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-side {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-text {
  font-family: 'Didact Gothic', sans-serif;
  letter-spacing: 2px;
  font-size: 28px;
  color: #FFFFFF;
  margin: 0px 0px 0px 10px;
  font-weight: bold;
}

img {
  width: 25px;
  height: 25px;
}

img:hover, img:active {
  color: #CC45CC;
  transition: color ease 0.5s;
}

.button {
  cursor: pointer;
}

.search {
  padding-left: 5px;
}

input:focus,
input:active {
  outline: none;
}

input {
  background: transparent;
  border: none;
  font-size: 18px;
  color: #FFFFFF;
  width: 300px;
}

input::placeholder {
  color: #FFFFFF;
  opacity: 0.33;
}
</style>

