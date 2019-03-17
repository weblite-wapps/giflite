<template>
  <div class="header">
    <div class="box" :style="someStyle">
      <input
        v-if="isSearching"
        autofocus
        class="input"
        @input="debounceInput"
        type="search"
        placeholder="Search..."
      >
      <div v-if="!isSearching" class="logo">
        <p>logo</p>
      </div>
      <div class="container-2" v-if="!isSearching">
        <span v-if="page === 'main'" class="home-and-save-icon">
          <img @click="changePage" src="../assets/bookmark.svg">
        </span>
        
        <span v-if="page === 'favourites'" class="home-and-save-icon">
          <i @click="changePage" class="fa fa-home"/>
        </span>
      </div>
      <div class="container-1">
        <span class="search-icon">
          <i @click="toggleSearch" class="fa fa-search"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce'

export default {
  name: 'Header',

  props: {
    searchContent: Function,
    page: String,
  },

  data() {
    return {
      isSearching: false,
    }
  },

  methods: {
    debounceInput: debounce(function({ target: { value } }) {
      this.$emit('changePage', 'main')
      this.searchContent(value.trim())
    }, 1000),

    changePage() {
      if (this.page === 'main') this.$emit('changePage', 'favourites')
      else this.$emit('changePage', 'main')
    },

    toggleSearch() {
      this.isSearching = !this.isSearching
    },
  },

  computed: {
    someStyle() {
      if (this.isSearching) {
        return `grid-template-columns: auto 0px 40px;`
      } else {
        return `grid-template-columns: auto 40px 40px;`
      }
    },
  },
}
</script>

<style scoped>
.header {
  background: #a700d1;
  background-image: linear-gradient(
    to right,
    rgb(240, 70, 211),
    rgb(27, 153, 211)
  );
}

.logo {
  grid-area: logo;
}

img {
  width: 20px;
  height: 20px;
}

.box {
  /* height: 50px; */
  display: grid;
  grid-template-columns: auto 40px 40px;
  grid-template-rows: 50px;
  justify-self: stretch;
  align-self: stretch;
  grid-template-areas: 'logo bookmark search';
}

.container-1 {
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
  grid-area: search;
}

.container-1 .search-icon {
  position: absolute;
  margin-left: 6px;
  margin-top: 16px;
  z-index: 1;
  color: #4f5b66;
}
.box input:focus,
.box input:active {
  outline: none;
}

.box input {
  margin-top: 10px;
  width: 300px;
  height: 30px;
  background: #850068;
  border: none;
  font-size: 10pt;
  display: absolute;
  color: whitesmoke;
  padding-left: 15px;
  z-index: 10;
}

.container-2 .home-and-save-icon {
  color: #4f5b66;
  position: relative;
  top: 30%;
  margin-left: 15px;
}
.container-2 {
  grid-area: bookmark;
}
</style>

