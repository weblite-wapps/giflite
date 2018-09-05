<template>
    <div class="conatainer"> 
      
        <Gif
            v-for="item in gifurls"
            :key="item"
            :url="item"
        />
    </div>
    
</template>

<script>
import Gif from "./Gif"
export default {
  name: "Gifs",
  props: {
    gifurls: {
      Type: Array,
      required: true,
    },
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
