<script lang="ts" setup>
import { ref } from "vue";
const searchbox = ref();
</script>

<template>
  <form class="input-group mb-3 smallWidth">
    <div class="input-group-prepend">
      <div class="btn static btn-outline-secondary" type="button">Filter:</div>
    </div>
    <input
      type="text"
      class="form-control"
      ref="searchbox"
      placeholder="filter requests"
      @input="$emit('filter', searchbox.value)"
    />
  </form>
</template>

<style scoped>
.smallWidth {
  width: 30%;
  min-width: 15em;
}
.static {
  pointer-events: none;
}
</style>
