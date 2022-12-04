<script lang="ts" setup>
import FilterInput from "./FilterInput.vue";
import RequestCard from "./RequestCard.vue";
import { get } from "../utils";
import { onMounted, ref } from "vue";
import type { PlaceRequestResponse } from "../../backend/request/util";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const ownRequests = ref<PlaceRequestResponse[]>([]);
const filter = ref("");
const filteredRequests = ref<PlaceRequestResponse[]>(ownRequests.value);
const updateFilter = (event: string) => {
  filter.value = event;
  filteredRequests.value = ownRequests.value.filter(
    (req) =>
      req.title.toLowerCase().includes(filter.value.toLowerCase()) ||
      req.textContent.toLowerCase().includes(filter.value.toLowerCase())
  );
};

async function loadMyRequests() {
  const response = await get(
    `/api/requests?user=${userStore.user?.gapiUserId}`
  );
  ownRequests.value = response.requests;
  filteredRequests.value = ownRequests.value;
  filter.value = "";
}

onMounted(loadMyRequests);
</script>

<template>
  <div>
    <section class="spanned">
      <h5>My Requests</h5>
      <FilterInput @filter="updateFilter($event)" />
    </section>
    <div class="row row-cols-lg-3">
      <div
        v-for="request in filteredRequests"
        :key="request.dateCreated"
        class="bottom-buffer"
      >
        <RequestCard :request="request" />
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
