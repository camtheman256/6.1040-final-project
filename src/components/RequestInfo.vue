<script lang="ts" setup>
import { computed } from "vue";
import type { PlaceRequestResponse } from "../../backend/request/util";
import { marked } from "marked";
import DOMPurify from "dompurify";
import UserProfile from "./UserProfile.vue";

// TODO(porderiq): Add type of request.
const props = defineProps<{ request: PlaceRequestResponse }>();
const onCardClick = () =>
  // TODO(porderiq): redirect to correct view.
  console.log("Go to page for this card:", props.request);

const requestStatus = computed<string>(() => {
  if (props.request?.resolved) return "Resolved";
  return "Not Addressed";
});

const statusStyle = {
  "bg-secondary": requestStatus.value === "Not Addressed",
  "bg-warning": requestStatus.value === "In Progress",
  "bg-success": requestStatus.value === "Resolved",
};

const purify = DOMPurify(window);

const responseHtml = computed(() =>
  purify.sanitize(marked.parse(props.request.textContent))
);
</script>

<template>
  <div class="card text-white bg-dark" @click="onCardClick">
    <div class="card-body">
      <h5 class="card-title spanned">
        {{ props.request.title }}
        <span class="text-muted">
          {{ props.request.upvotingUsers.length }}
          <a href="#" class="btn btn-sm btn-primary">👍</a>
        </span>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ props.request.space.name }}
      </h6>
      <p class="card-text" v-html="responseHtml"></p>
      <p class="emphasized">
        <UserProfile
          :user="props.request.author"
          height="30"
          class="d-inline-flex align-middle"
          :suffix="` at ${props.request.dateCreated}`"
        />
      </p>
      <div class="btn status text-white" :class="statusStyle">
        Status: {{ requestStatus }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.spanned {
  display: flex;
  justify-content: space-between;
}
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}
.status {
  pointer-events: none;
}
</style>
