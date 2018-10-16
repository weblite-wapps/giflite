<template>
    <div class="header">
      <div class="box">
        <div class="container-1">
          <span class="search-icon">
            <i class="fa fa-search"/>
          </span>
          
          <input
            autofocus
            @input="debounceInput"
            type="search"
            placeholder="Search..."
          />
        </div>
        <div class="container-2">
          <span
            v-if="page === 'main'"
            class="home-and-save-icon"
          >
            <i 
              @click="changePage" 
              class="fa fa-bookmark"
            />
          </span>

          <span 
            v-if="page === 'favourites'" 
            class="home-and-save-icon"
          >
            <i 
              @click="changePage" 
              class="fa fa-home"
            />
          </span>
        </div>
      </div>
    </div>
</template>

<script>
import debounce from "debounce"

export default {
  name: "Header",

  props: {
    searchContent: Function,
    page: String,
  },

  methods: {
    debounceInput: debounce(function({ target: { value } }) {
      this.$emit("changePage", "main")
      this.searchContent(value.trim())
    }, 1000),

    changePage() {
      if (this.page === "main") this.$emit("changePage", "favourites")
      else this.$emit("changePage", "main")
    },
  },
}
</script>

<style scoped>
.header {
  background: #2b303b;
}

.box {
  height: 50px;
  display: flex;
}

.container-1 {
  width: 300px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
}

.container-1 .search-icon {
  position: absolute;
  /* top: 20%; */
  margin-left: 17px;
  margin-top: 15px;
  z-index: 1;
  color: #4f5b66;
}
.container-1 input:focus,
.container-1 input:active {
  outline: none;
}

.container-1 input {
  width: 300px;
  height: 50px;
  background: #2b303b;
  border: none;
  font-size: 10pt;
  float: left;
  color: whitesmoke;
  padding-left: 45px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.container-2 .home-and-save-icon {
  color: #4f5b66;
  position: relative;
  top: 30%;
}
</style>

