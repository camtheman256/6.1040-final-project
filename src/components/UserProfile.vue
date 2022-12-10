<script setup lang="ts">
import type { UserResponse } from "../../backend/user/util";
withDefaults(
  defineProps<{ user: UserResponse; height: string; suffix?: string }>(),
  {
    height: "40px",
  }
);
</script>
<template>
  <div class="d-flex gap-2 align-items-center">
    <img :src="user.imageUrl" class="rounded-circle" :height="height" />
    <span>{{ user.name }}{{ suffix }}</span>
  </div>
</template>
