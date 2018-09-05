<template>
    <div class="gifRoot">
        <img :src="url" alt="image place"> 
    </div>
</template>

<script>
export default {
  name: "Gif",
  props: {
    url: {
      Type: String,
    },
  },
}
</script>


<style scoped>
.gifRoot {
  padding-top: 0.5%;
}
</style>
