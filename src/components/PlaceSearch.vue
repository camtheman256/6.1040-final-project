<script setup lang="ts">
import { loadScript } from "vue-plugin-load-script";
import type {} from "google.maps";
import { ref } from "vue";

const searchbox = ref();

const emit = defineEmits<{
  (e: "selected", value: google.maps.places.PlaceResult): void;
}>();

/* global google */
loadScript(
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDhCO6sNefSGvLNNXx6i_IB6KsUmks1uWo&libraries=places"
).then(() => {
  const autocomplete = new google.maps.places.Autocomplete(searchbox.value, {
    componentRestrictions: { country: "us" },
    fields: [
      "name",
      "place_id",
      "url",
      "geometry",
      "formatted_address",
      "formatted_phone_number",
      "website",
      "photos",
    ],
  });
  autocomplete.addListener("place_changed", () => {
    emit("selected", autocomplete.getPlace());
  });
});
</script>

<template>
  <div class="form-group mb-3">
    <label for="place-search" class="form-label">Location</label>
    <input type="text" class="form-control" ref="searchbox" form="" />
  </div>
</template>
