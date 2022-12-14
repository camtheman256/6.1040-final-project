<script setup lang="ts">
import SpaceInfo from "../components/SpaceInfo.vue";
import RequestsRow from "../components/RequestsRow.vue";
import CreateRequestForm from "../components/CreateRequestForm.vue";
import { useRoute } from "vue-router";
import type { SpaceResponse } from "../../backend/space/util";
import { onMounted, ref } from "vue";
import { get } from "../utils";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const userStore = useUserStore();
const requests = ref<InstanceType<typeof RequestsRow>>();

const placeId = route.params.id.toString();

const initialized = ref(false);
const space = ref<SpaceResponse>();

const loadSpace = async () => {
  const response = await get(`/api/spaces?place_id=${placeId}`);
  initialized.value = true;
  space.value = response.space;
};

onMounted(loadSpace);
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
            <CreateRequestForm
              v-if="userStore.user"
              @created="requests?.loadRequests()"
              :place_id="placeId"
            />
          </div>
        </div>
        <div class="col-lg-8">
          <RequestsRow :space="space" ref="requests" />
        </div>
      </div>
    </section>
    <section v-else-if="initialized">
      <h2>No space with id {{ $route.params.id }}</h2>
    </section>
    <section v-else>
      <div class="d-flex gap-3">
        <div class="spinner-border"></div>
        <h2>Loading space {{ $route.params.id }}</h2>
      </div>
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
