<template>
    <div class="Header">
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


<style>
</style>
