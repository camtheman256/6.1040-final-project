<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { post, _delete } from "@/utils";
import type { PlaceRequestResponse } from "../../backend/request/util";

const props = defineProps<{ request: PlaceRequestResponse }>();
const emit = defineEmits<{ (event: "buttonClick"): void }>();
const userStore = useUserStore();

const likedByUser = computed(() =>
  props.request.upvotingUsers
    .map((user) => user.gapiUserId)
    .includes(userStore.user?.gapiUserId ?? "")
);

const buttonStyle = computed(() => ({
  "btn-secondary": !likedByUser.value,
  "btn-primary": likedByUser.value,
}));

const onLike = async () => {
  // TODO: replace with PUT request.
  if (likedByUser.value)
    await _delete(`/api/upvotes?requestId=${props.request._id}`);
  else await post(`/api/upvotes/${props.request._id}`, {});
  emit("buttonClick");
};
</script>

<template>
  <span class="text-muted">
    {{ props.request.upvotingUsers.length }}
    <button
      :disabled="userStore.user === undefined"
      :class="buttonStyle"
      class="btn btn-sm"
      href="#"
      @click="onLike"
    >
      👍
    </button>
  </span>
</template>
