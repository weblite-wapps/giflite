<template>
   <input
        autofocus
        dir="auto"
        @input="debounceInput"
        type="search"
        placeholder="Enter Key Word..."
    />
</template>

<script>
// modules
import debounce from 'debounce'

export default {
  name: 'Input',

  props: {
    searchContent: Function,
  },
  methods: {
    debounceInput: debounce(function({ target: { value } }) {
      this.$emit('changePage', 'main')
      this.searchContent(value.trim())
    }, 1000),
  },

  mounted() {
    this.$el.focus()
  },
}
</script>
