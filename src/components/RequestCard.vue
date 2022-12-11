<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { PlaceRequestResponse } from "../../backend/request/util";
import UserProfile from "./UserProfile.vue";

// TODO(porderiq): Add type of request.
const props = defineProps<{ request: PlaceRequestResponse }>();
const router = useRouter();
const userStore = useUserStore();

const onCardClick = () =>
  router.push(`/space/${props.request?.space.place_id}`);

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
const requestTagline = computed(() =>
  purify.sanitize(marked.parseInline(props.request.textContent, {}), {
    FORBID_TAGS: ["img"],
  })
);

const getDate = (isoString: string): Date => new Date(isoString);
</script>

<template>
  <div class="requestCard card text-white bg-dark" @click="onCardClick">
    <div class="card-body">
      <h5 class="card-title spanned">
        {{ props.request.title }}
        <span class="text-muted">
          {{ props.request.upvotingUsers.length }}
          <button
            href="#"
            class="btn btn-sm btn-primary"
            :disabled="!userStore.user"
          >
            👍
          </button>
        </span>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ props.request.space.name }}
      </h6>
      <p class="card-text" v-html="requestTagline"></p>
    </div>
    <div class="card-footer"></div>
    <div class="card-footer">
      <p class="emphasized">
        <UserProfile
          :user="props.request.author"
          class="d-inline-flex"
          :suffix="` at ${getDate(props.request.dateCreated).toLocaleString()}`"
          height="30"
        />
      </p>
      <div class="btn status text-white" :class="statusStyle">
        Status: {{ requestStatus }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.requestCard {
  box-shadow: -7px -7px rgb(188, 188, 188);
  height: 100%;
  padding-bottom: 8px;
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
