<template>
    <div class="conatainer"> 
        <Gif
            v-for="item in gifurls"
            :key="item[0]"
            :url="item"
            :Send="Send"
            :Like="like"

        />
    </div>
    
</template>

<script>
import Gif from "./Gif"
export default {
  name: "Gifs",
  props: {
    gifurls: {
      Type: Object,
      required: true,
    },
    like: Function,
    Send: Function,
  },
  components: {
    Gif,
  },
}
</script>


<style scoped>
.conatainer {
  display: flex;
  flex-wrap: wrap;
}
</style>
