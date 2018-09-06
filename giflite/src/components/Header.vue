<template>
    <div class="header">
        <div>
            <input  v-model="searchText" type="text">
            <button @click="search(searchText)">search</button>

        </div>
    </div>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {
      searchText: "",
    }
  },
  props: {
    search: Function,
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
