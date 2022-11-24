<script setup lang="ts">
import { loadScript } from "vue-plugin-load-script";
import type {} from "google.maps";
import { ref } from "vue";

const searchbox = ref();
const placeDetails = ref();

/* global google */
loadScript(
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDhCO6sNefSGvLNNXx6i_IB6KsUmks1uWo&libraries=places"
).then(() => {
  const autocomplete = new google.maps.places.Autocomplete(searchbox.value, {
    componentRestrictions: { country: "us" },
    fields: ["name", "place_id", "url", "geometry"],
  });
  autocomplete.addListener("place_changed", () => {
    placeDetails.value = autocomplete.getPlace();
  });
});
</script>

<template>
  <div>
    <h3>Selected place:</h3>
    <p>{{ placeDetails }}</p>
    <div>
      <label for="place-search" class="form-label">Place Search</label>
      <input type="text" class="form-control" ref="searchbox" />
    </div>
  </div>
</template>
