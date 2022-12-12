<script lang="ts" setup>
import { Dropdown } from "bootstrap";
import { computed } from "vue";

const props = defineProps({
  canDropdown: { type: Boolean },
  resolved: { type: Boolean },
});

const styleStatus = computed(() => ({
  "bg-secondary": !props.resolved,
  "bg-success": props.resolved,
}));

const requestStatus = computed<string>(() => {
  if (props.resolved) return "Resolved";
  return "Not Addressed";
});

const emit = defineEmits<{ (event: "resolved", status: boolean): void }>();

const onStatusChange = (event: boolean) => {
  const dropdownElement = document.getElementById("dropdownMenuLink");
  Dropdown.getInstance(dropdownElement!)?.hide();
  emit("resolved", event);
};
</script>

<template>
  <div v-if="props.canDropdown" class="dropdown">
    <a
      :class="styleStatus"
      class="btn btn-secondary dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      id="dropdownMenuLink"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Status: {{ requestStatus }}
    </a>

    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a @click="onStatusChange(false)" class="dropdown-item" href="#"
        >Not Addressed</a
      >
      <a @click="onStatusChange(true)" class="dropdown-item" href="#"
        >Resolved</a
      >
    </div>
  </div>
  <div v-else class="btn nopointer text-white" :class="styleStatus">
    Status: {{ requestStatus }}
  </div>
</template>

<style scoped>
.nopointer {
  pointer-events: none;
}
</style>
