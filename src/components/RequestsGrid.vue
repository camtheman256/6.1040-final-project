<script lang="ts" setup>
import FilterInput from "./FilterInput.vue";
import RequestCard from "./RequestCard.vue";
import { get } from "../utils";
import { onMounted, ref } from "vue";
import type { PlaceRequestResponse } from "../../backend/request/util";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const requests = ref<PlaceRequestResponse[]>([]);
const filter = ref("");
const filteredRequests = ref<PlaceRequestResponse[]>(requests.value);
const updateFilter = (event: string) => {
  filter.value = event;
  filteredRequests.value = requests.value.filter(
    (req) =>
      req.title.toLowerCase().includes(filter.value.toLowerCase()) ||
      req.textContent.toLowerCase().includes(filter.value.toLowerCase())
  );
};

async function loadRequests() {
  const route = userStore.user
    ? `/api/requests?user=${userStore.user?.gapiUserId}`
    : "/api/requests";
  const response = await get(route);
  requests.value = response.requests;
  filteredRequests.value = requests.value;
  filter.value = "";
}

onMounted(loadRequests);
</script>

<template>
  <div>
    <section class="spanned">
      <h4>
        {{ userStore.user ? "My Requests" : "Discover All Requests" }}
      </h4>
      <FilterInput
        @filter="updateFilter($event)"
        placeholder="Request or Space Name"
      />
    </section>
    <div class="row row-cols-lg-3">
      <div
        v-for="request in filteredRequests"
        :key="request.dateCreated"
        class="bottom-buffer"
      >
        <RequestCard :request="request" />
      </div>
      <div v-if="!requests.length">
        <h4>
          {{
            userStore.user
              ? "👻 You don't have any requests yet"
              : "No requests made yet."
          }}
        </h4>
        <RouterLink to="/spaces"
          >&rarr; Visit the Spaces page to contribute.</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.spanned {
  display: flex;
  justify-content: space-between;
}

.bottom-buffer {
  margin-bottom: 1rem;
}
</style>
