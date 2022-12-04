<script setup lang="ts">
import SpaceInfo from "../components/SpaceInfo.vue";
import RequestsRow from "../components/RequestsRow.vue";
import CreateRequestForm from "../components/CreateRequestForm.vue";
import { useRoute } from "vue-router";
import type { PlaceRequestResponse } from "../../backend/request/util";
import type { SpaceResponse } from "../../backend/space/util";
import { onMounted, ref } from "vue";
import { get } from "../utils";

const route = useRoute();
console.log(route.params);

// TODO: GET request space by route params :id
const space = ref<SpaceResponse>();
const spaceRequests = ref<PlaceRequestResponse[]>([]);
onMounted(async () => {
  const response = await get(`/api/spaces/${route.params.id}`);
  space.value = response.space;
});
</script>

<template>
  <main>
    <section v-if="space">
      <div class="row">
        <div class="col-lg-4">
          <div class="row bottom-buffer">
            <SpaceInfo :space="space" />
          </div>
          <div class="row">
            <CreateRequestForm />
          </div>
        </div>
        <div class="col-lg-8">
          <RequestsRow :space-requests="spaceRequests" />
        </div>
      </div>
    </section>

    <section v-else>
      <h2>No space with id {{ $route.params.id }}</h2>
    </section>
  </main>
</template>

<style scoped>
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}

.bottom-buffer {
  margin-bottom: 1rem;
}
</style>