<script lang="ts" setup>
import { ref } from "vue";
const searchbox = ref();
</script>

<template>
  <form class="input-group mb-3 smallWidth">
    <input
      type="text"
      class="form-control"
      ref="searchbox"
      placeholder="filter requests"
    />

    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="$emit('filter', searchbox.value)"
      >
        Search
      </button>
    </div>
  </form>
</template>

<style scoped>
.smallWidth {
  width: 30%;
  min-width: 15em;
}
</style>
