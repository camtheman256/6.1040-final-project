<script lang="ts" setup>
import { ref } from "vue";
const searchbox = ref();
const props = defineProps({
  placeholder: { type: String },
});
</script>

<template>
  <form class="input-group mb-3 smallWidth">
    <div class="input-group">
      <div class="btn static btn-outline-secondary" type="button">Filter:</div>
      <input
        type="text"
        class="form-control"
        ref="searchbox"
        :placeholder="props.placeholder ? props.placeholder : ''"
        @input="$emit('filter', searchbox.value)"
      />
    </div>
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
