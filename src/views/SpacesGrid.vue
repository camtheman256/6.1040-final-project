<script lang="ts" setup>
import type { SpaceResponse } from "../../backend/space/util";
import FilterInput from "../components/FilterInput.vue";
import SpaceCard from "../components/SpaceCard.vue";
import { onMounted, ref } from "vue";
import CreateSpaceModal from "../components/CreateSpaceModal.vue";
import { useUserStore } from "@/stores/user";
import { get } from "@/utils";
import SpaceMap from "@/components/SpaceMap.vue";

const userStore = useUserStore();
const allSpaces = ref<SpaceResponse[]>([]);

async function loadSpaces() {
  const response = await get("/api/spaces");
  // Sort spaces by checkin count, break ties by name.
  response.spaces
    .sort((a: SpaceResponse, b: SpaceResponse) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    )
    .sort((a: SpaceResponse, b: SpaceResponse) =>
      a.totalCheckInCount > b.totalCheckInCount
        ? -1
        : b.totalCheckInCount > a.totalCheckInCount
        ? 1
        : 0
    );
  allSpaces.value = response.spaces;
  filter.value = "";
  filteredSpaces.value = response.spaces;
}

onMounted(loadSpaces);

const filter = ref("");
const filteredSpaces = ref<SpaceResponse[]>(allSpaces.value);

const updateFilter = (event: string) => {
  filter.value = event;
  filteredSpaces.value = allSpaces.value.filter((space) =>
    space.name.toLowerCase().includes(filter.value)
  );
};
</script>

<template>
  <section>
    <h1>All Spaces</h1>
    <SpaceMap :spaces="allSpaces" />
    <hr />
  </section>
  <section>
    <section class="d-flex flex-wrap mb-3 justify-content-between">
      <div>
        <button
          type="button"
          class="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#createSpaceModal"
          v-if="userStore.user"
        >
          Create Space ➕
        </button>
      </div>
      <div>
        <FilterInput
          placeholder="Filter Spaces"
          @filter="updateFilter($event)"
        />
      </div>
    </section>
    <h5 class="bottom-buffer">
      All Spaces <span class="badge text-bg-danger"># of check-ins</span>
    </h5>
    <div class="row row-cols-md-3">
      <div
        v-for="space in filteredSpaces"
        :key="space._id"
        class="bottom-buffer"
      >
        <SpaceCard :space="space" />
      </div>
    </div>
    <CreateSpaceModal @created="loadSpaces()" />
  </section>
</template>

<style scoped>
.bottom-buffer {
  margin-bottom: 1rem;
}
</style>
