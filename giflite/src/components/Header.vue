<template>
  <div class="header">
    <div class="box" :style="someStyle">
      <input
        v-if="isSearching"
        autofocus
        class="input"
        @input="debounceInput"
        type="search"
        placeholder="Enter Key Word..."
      >

      <div v-if="!isSearching" class="logo">
        <img class="logo-img" src="../assets/logo.png" alt="Gif Lite">
        <p class="logo-text">GIFLITE</p>
      </div>

      <div class="container-2" v-if="!isSearching" @click="changePage">
        <abbr title="Bookmark">
          <span v-if="page === 'main'" class="icon">
            <i class="fa fa-bookmark fa-lg"/>
          </span>
        </abbr>
        
        <abbr title="Home">
          <span v-if="page === 'favourites'" class="icon">
            <i class="fa fa-home fa-lg"/>
          </span>
        </abbr>
      </div>

      <div class="container-1" @click="toggleSearch">
        <abbr title="Search">
          <span class="search-icon icon">
            <i class="fa fa-search fa-lg"/>
          </span>
        </abbr>
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
  background: rgb(208,64,202);
  background: linear-gradient(90deg, rgba(208,64,202,1) 0%, rgba(0,192,255,1) 100%);
}

.logo {
  grid-area: logo;
  display: flex;
  align-items: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.logo-img {
  margin-left: 15px;
}

.logo-text {
  font-family: 'Didact Gothic', sans-serif;
  letter-spacing: 2px;
  font-size: 28px;
  color: #FFFFFF;
  margin-left: 12.5px;
  font-weight: bold;
}

/* img {
  width: 25px;
  height: 25px;
} */

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
  cursor: pointer;
}

.container-1 .search-icon {
  position: absolute;
  margin-left: 6px;
  margin-top: 16px;
  z-index: 1;
  color: #FFFFFF;
}

.box input:focus,
.box input:active {
  outline: none;
}

.box input {
  margin-top: 10px;
  width: 300px;
  height: 30px;
  background: transparent;
  border: none;
  font-size: 18px;
  display: absolute;
  color: #FFFFFF;
  padding-left: 15px;
  z-index: 10;
}

.box input::placeholder {
  color: #FFFFFF;
  opacity: 0.33;
}

.container-2 .icon {
  color: #FFFFFF;
  position: relative;
  top: 30%;
  margin-left: 10px;
}

.container-2 .icon img {
  width: 19px;
  height: 21px;
} 

.icon:hover, .icon:active {
  color: #CC45CC;
  transition: color ease 0.5s;
}


.container-2 {
  grid-area: bookmark;
  cursor: pointer;
}
</style>

