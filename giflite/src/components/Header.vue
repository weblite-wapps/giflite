<template>
    <div class="header">
        <div>
            <input  v-model="search" type="text">
            <button @click="send(search)">click</button>

        </div>
    </div>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {
      search: "",
    }
  },
  props: {
    send: Function,
  },
}

method: {
}
</script>


<style scoped>
.header {
  padding: 15px 15% 15px 15%;
  height: 6%;
  background: #14222f;
}
</style>
