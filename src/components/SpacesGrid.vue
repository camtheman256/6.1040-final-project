<script lang="ts" setup>
import type { SpaceResponse } from "../../backend/space/util";
import FilterInput from "./FilterInput.vue";
import SpaceCard from "./SpaceCard.vue";
import { onMounted, ref } from "vue";
import CreateSpaceModal from "./CreateSpaceModal.vue";
import { useUserStore } from "@/stores/user";
import { get } from "@/utils";

const userStore = useUserStore();
const allSpaces = ref<SpaceResponse[]>([]);

async function loadSpaces() {
  const response = await get("/api/spaces");
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
    <h5 class="bottom-buffer">All Spaces</h5>
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
