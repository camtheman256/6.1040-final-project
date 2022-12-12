<script lang="ts" setup>
import { computed } from "vue";
import type { PlaceRequestResponse } from "../../backend/request/util";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useUserStore } from "@/stores/user";
import { put } from "../utils";
import UserProfile from "./UserProfile.vue";
import StatusTag from "../components/StatusTag.vue";

const props = defineProps<{ request: PlaceRequestResponse }>();
const emit = defineEmits<{
  (event: "refreshRequests"): void;
}>();

const onDropdownChange = async (resolved: boolean) => {
  await put(`/api/requests/${props.request._id}`, { resolved });
  emit("refreshRequests");
};

const userStore = useUserStore();

const purify = DOMPurify(window);

const responseHtml = computed(() =>
  purify.sanitize(marked.parse(props.request.textContent))
);

const getDate = (isoString: string): Date => new Date(isoString);

const likedByUser = computed(() =>
  props.request.upvotingUsers
    .map((user) => user.name)
    .includes(userStore.user!.name)
);

const buttonStyle = computed(() => ({
  "btn-secondary": !likedByUser.value,
  "btn-primary": likedByUser.value,
}));

const onLike = () => {
  // TODO: replace with PUT request.
  console.log("like PUT request here!");
  emit("refreshRequests");
};
</script>

<template>
  <div class="card text-white bg-dark">
    <div class="card-body">
      <h5 class="card-title spanned">
        {{ props.request.title }}
        <span class="text-muted">
          {{ props.request.upvotingUsers.length }}
          <button
            v-if="userStore.user"
            :class="buttonStyle"
            class="btn btn-sm"
            href="#"
            @click="onLike"
          >
            👍
          </button>
          <span v-else>👍</span>
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
          :suffix="` at ${getDate(props.request.dateCreated).toLocaleString()}`"
        />
      </p>
      <StatusTag
        :can-dropdown="userStore.user?.name === props.request.author.name"
        :resolved="props.request.resolved"
        @resolved="onDropdownChange($event)"
      />
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
</style>
