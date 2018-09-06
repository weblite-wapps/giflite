<template>
    <div class="card">
        <div class="card-content">
          <img 
            :src="url[0]" 
            alt="image place"
            :class="{hidden: !canShow, isShowing: canShow}"
          >
        </div>
        <button v-on:click="Like(url)">like</button>
        <button v-on:click="Send">Send</button>
        <!-- <button v-on:click="changeShow">Show</button> -->
    </div>
</template>

<script>
export default {
  name: "Gif",
  data() {
    return {
      canShow: Boolean,
      default: false,
    }
  },
  props: {
    url: Array,
    Like: Function,
    Send: Function,
  },
  methods: {
    changeShow() {
      // must stop and play again
    },
  },
}
</script>
<style scoped>
.card {
  padding-top: 0.5%;
}
</style>
