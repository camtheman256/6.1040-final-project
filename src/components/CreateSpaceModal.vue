<script lang="ts" setup>
import { post } from "@/utils";
import type {} from "google.maps";
import { ref } from "vue";
import PlaceSearch from "./PlaceSearch.vue";
import { Modal } from "bootstrap";

const emit = defineEmits<{ (event: "created"): void }>();

/* global google */
const locationDetails = ref<google.maps.places.PlaceResult>();
const placeSearchRef = ref<InstanceType<typeof PlaceSearch> | null>(null);

const onSubmit = async () => {
  if (locationDetails.value === undefined) return;
  await post("/api/spaces", {
    ...locationDetails.value,
    photos: [locationDetails.value.photos?.at(0)?.getUrl()],
  });

  const modal = Modal.getOrCreateInstance("#createSpaceModal");
  modal.toggle();
  locationDetails.value = undefined;
  placeSearchRef.value?.clear();
  emit("created");
};
</script>
<template>
  <div class="modal fade" id="createSpaceModal">
    <div class="modal-dialog">
      <div class="modal-content bg-dark bg text-white">
        <div class="modal-header">
          <h4 class="modal-title">Create Space</h4>
          <button class="btn btn-outline-light" data-bs-dismiss="modal">
            ❌
          </button>
        </div>
        <div class="modal-body">
          <p>Use the Google Maps lookup below to find a space to create.</p>
          <form class="mb-3 smallWidth" @submit.prevent="onSubmit">
            <PlaceSearch
              ref="placeSearchRef"
              @selected="(value) => (locationDetails = value)"
            />
            <div v-if="locationDetails">
              <p><b>Name:</b> {{ locationDetails.name }}</p>
              <p>
                <a
                  :href="locationDetails.url"
                  v-if="locationDetails.url"
                  target="_blank"
                  >Google Maps Link</a
                >
              </p>
              <p><b>Address:</b> {{ locationDetails.formatted_address }}</p>
            </div>
            <div v-else class="alert alert-danger">A location is required.</div>
            <button class="btn btn-outline-success" type="submit">
              Create ➕
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.smallWidth {
  width: 80%;
  min-width: 15em;
}
.static {
  pointer-events: none;
}
</style>

<style>
.pac-container {
  z-index: 9999;
}
</style>
