<script lang="ts" setup>
import type {} from "google.maps";
import { ref } from "vue";
import PlaceSearch from "./PlaceSearch.vue";

/* global google */
const locationDetails = ref<google.maps.places.PlaceResult>();

const onSubmit = () => {
  console.log("form submitted!");
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
          <form class="mb-3 smallWidth" @submit.prevent="onSubmit">
            <div class="input-group mb-3">
              <div class="btn static btn-outline-secondary" type="button">
                Name
              </div>
              <input
                type="text"
                class="form-control"
                ref="searchbox"
                placeholder="Space Name"
              />
            </div>
            <PlaceSearch @selected="(value) => (locationDetails = value)" />
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
            <button
              class="btn btn-outline-success"
              type="submit"
              @click="onSubmit"
            >
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
