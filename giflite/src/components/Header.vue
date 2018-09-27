<template>
    <div class="header">
      <div class="box">
        <div class="container-1">
          <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
          <span class="icon"><i class="fa fa-search"></i></span>
          <input  autofocus @input="changeWithDebounce" v-model="searchText" type="search" id="search" placeholder="Search..." />
        </div>
        <div class="container-2">
          <span><img @click="goToFav" class="saved_btn" src="./../assets/save3.png" alt=""></span>  
        </div>
      </div>
    </div>
</template>

<script>
import debounce from "debounce"
export default {
  name: "Header",
  data: function() {
    return {
      searchText: "",
      changeWithDebounce: debounce(this.onChange, 1000),
    }
  },
  props: {
    search: Function,
    ShowTrend: Function,
  },
  created() {
    this.ShowTrend()
  },
  methods: {
    onChange() {
      this.$emit("state", "mainPage")
      this.search(this.searchText.trim())
    },
    goToFav() {
      this.$emit("state", "favouritesPage")
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
}

.container-1 {
  width: 300px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
}

.container-1 input#search {
  width: 300px;
  height: 50px;
  background: #2b303b;
  border: none;
  font-size: 10pt;
  float: left;
  color: #63717f;
  padding-left: 45px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.container-1 input#search::-webkit-input-placeholder {
  color: #65737e;
}

.container-1 input#search:-moz-placeholder {
  /* Firefox 18- */
  color: #65737e;
}

.container-1 input#search::-moz-placeholder {
  /* Firefox 19+ */
  color: #65737e;
}

.container-1 input#search:-ms-input-placeholder {
  color: #65737e;
}

.container-1 .icon {
  position: absolute;
  top: 50%;
  margin-left: 17px;
  margin-top: 15px;
  z-index: 1;
  color: #4f5b66;
}
.container-1 input#search:focus,
.container-1 input#search:active {
  outline: none;
}

.container-1 input#search {
  width: 300px;
  height: 50px;
  background: #2b303b;
  font-size: 10pt;
  float: left;
  color: whitesmoke;
  padding-left: 45px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;

  -webkit-transition: background 0.55s ease;
  -moz-transition: background 0.55s ease;
  -ms-transition: background 0.55s ease;
  -o-transition: background 0.55s ease;
  transition: background 0.55s ease;
}

.saved_btn {
  margin-top: 13px;
}
</style>

