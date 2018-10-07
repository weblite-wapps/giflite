<template>
    <div class="header">
      <div class="box">
        <div class="container-1">
          <span class="icon">
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
          <!-- TODO: use font-awesome -->
          <img 
            v-if="state === 'main'"
            @click="changeState" 
            class="headerBtn" 
            src="./../assets/save3.png" 
            alt=""
          >
          <img
            v-if="state === 'favourites'"
            @click="changeState" 
            class="headerBtn" 
            src="./../assets/home-icon-silhouette.png" 
            alt=""
          >
        </div>
      </div>
    </div>
</template>

<script>
import debounce from "debounce"

export default {
  name: "Header",
  
  props: {
    search: Function,
    ShowTrend: Function,
    state: String,
  },

  created() { this.ShowTrend() },

  methods: {
    debounceInput: debounce(function ({ target: { value } }) {
      this.$emit("changeState", "main")
      this.search(value.trim())
    }, 1000),

    changeState() {
      if (this.state === "main") this.$emit("changeState", "favourites")
      else this.$emit("changeState", "main")
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

.container-1 input {
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

.container-1 input::-webkit-input-placeholder {
  color: #65737e;
}

.container-1 input:-moz-placeholder {
  /* Firefox 18- */
  color: #65737e;
}

.container-1 input::-moz-placeholder {
  /* Firefox 19+ */
  color: #65737e;
}

.container-1 input:-ms-input-placeholder {
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
.container-1 input:focus,
.container-1 input:active {
  outline: none;
}

.container-1 input {
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

.headerBtn {
  margin-top: 13px;
}
</style>

