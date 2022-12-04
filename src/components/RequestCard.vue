<script lang="ts" setup>
import DOMPurify from "dompurify";
import { marked } from "marked";
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { PlaceRequestResponse } from "../../backend/request/util";

// TODO(porderiq): Add type of request.
const props = defineProps<{ request: PlaceRequestResponse }>();
const router = useRouter();

const onCardClick = () => router.push(`/space/${props.request?.space}`);

const requestStatus = computed<string>(() => {
  if (props.request?.resolved) return "Resolved";
  if (props.request?.inProcess) return "In Progress";
  return "Not Addressed";
});

const statusStyle = {
  "bg-secondary": requestStatus.value === "Not Addressed",
  "bg-warning": requestStatus.value === "In Progress",
  "bg-success": requestStatus.value === "Resolved",
};

const purify = DOMPurify(window);
const requestTagline = computed(() =>
  purify.sanitize(marked.parseInline(props.request.textContent, {}), {
    FORBID_TAGS: ["img"],
  })
);
</script>

<template>
  <div class="requestCard card text-white bg-dark" @click="onCardClick">
    <div class="card-body">
      <h5 class="card-title spanned">
        {{ props.request.title }}
        <span class="text-muted">
          {{ props.request.upvotingUsers.length }}
          <a href="#" class="btn btn-sm btn-primary">👍</a>
        </span>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ props.request.space }}</h6>
      <p class="card-text" v-html="requestTagline"></p>
      <p class="emphasized">Created {{ props.request.dateCreated }}</p>
      <div class="btn status text-white" :class="statusStyle">
        Status: {{ requestStatus }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.requestCard {
  box-shadow: -7px -7px rgb(188, 188, 188);
}
.requestCard:hover {
  cursor: pointer;
  transform: scale(1.02);
}
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
