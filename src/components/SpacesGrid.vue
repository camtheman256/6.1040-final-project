<script lang="ts" setup>
import type { SpaceResponse } from "../../backend/space/util";
import FilterInput from "./FilterInput.vue";
import SpaceCard from "./SpaceCard.vue";
import { ref } from "vue";
import CreateSpaceModal from "./CreateSpaceModal.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const allSpaces: SpaceResponse[] = [
  {
    _id: "123abc",
    place_id: "abc123",
    formatted_address: "308 Negra Arroyo Lane",
    formatted_phone_number: "340-8234",
    name: "Pollos Hermanos",
    photos: [],
    url: "",
    website: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    _id: "123abc",
    place_id: "abc123",
    formatted_address: "42 Wallaby Way, Sydney",
    formatted_phone_number: "1-834-0234",
    name: "Sydney Opera House",
    photos: [],
    url: "",
    website: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    _id: "123abc",
    place_id: "abc123",
    formatted_address: "123 North Pole Way",
    formatted_phone_number: "1-834-0234",
    name: "Santas Workshop",
    photos: [],
    url: "",
    website: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    _id: "123abc",
    place_id: "abc123",
    formatted_address: "77 Massachusetts Ave",
    formatted_phone_number: "1-834-0234",
    name: "MIT Student Center",
    photos: [],
    url: "",
    website: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];
const filter = ref("");
const filteredSpaces = ref(allSpaces);

const updateFilter = (event: string) => {
  filter.value = event;
  filteredSpaces.value = allSpaces.filter((space) =>
    space.name.toLowerCase().includes(filter.value)
  );
};
</script>

<template>
  <section>
    <section class="spanned bottom-buffer">
      <button
        type="button"
        class="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#createSpaceModal"
        v-if="userStore.user"
      >
        Create Space ➕
      </button>
      <FilterInput placeholder="Filter Spaces" @filter="updateFilter($event)" />
    </section>
    <h5 class="bottom-buffer">All Spaces</h5>
    <div class="row row-cols-3">
      <div
        v-for="space in filteredSpaces"
        :key="space._id"
        class="bottom-buffer"
      >
        <SpaceCard :space="space" />
      </div>
    </div>
    <CreateSpaceModal />
  </section>
</template>

<style scoped>
.spanned {
  display: flex;
  justify-content: space-between;
  height: min-content;
}

.bottom-buffer {
  margin-bottom: 2rem;
}
</style>
