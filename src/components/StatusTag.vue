<script lang="ts" setup>
import { Dropdown } from "bootstrap";
import { computed, ref } from "vue";

const dropdownElement = ref<HTMLButtonElement>();

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
  Dropdown.getInstance(dropdownElement.value!)?.hide();
  emit("resolved", event);
};
</script>

<template>
  <div v-if="props.canDropdown" class="dropdown">
    <button
      :class="styleStatus"
      class="btn btn-secondary dropdown-toggle"
      role="button"
      data-bs-toggle="dropdown"
      id="dropdownMenuLink"
      aria-haspopup="true"
      ref="dropdownElement"
    >
      Status: {{ requestStatus }}
    </button>

    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <button @click="onStatusChange(false)" class="dropdown-item">
        Not Addressed
      </button>
      <button @click="onStatusChange(true)" class="dropdown-item">
        Resolved
      </button>
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
