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
  (event: "statusUpdate"): void;
}>();

const onDropdownChange = async (resolved: boolean) => {
  await put(`/api/requests/${props.request._id}`, { resolved });
  emit("statusUpdate");
};

const userStore = useUserStore();

const purify = DOMPurify(window);

const responseHtml = computed(() =>
  purify.sanitize(marked.parse(props.request.textContent))
);

const getDate = (isoString: string): Date => new Date(isoString);
</script>

<template>
  <div class="card text-white bg-dark">
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
