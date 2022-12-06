<script setup lang="ts">
import type { SpaceResponse } from "../../backend/space/util";
import L, { FeatureGroup, LayerGroup, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{ spaces: SpaceResponse[] }>();
const markerLayer = ref<FeatureGroup>(L.featureGroup());
const map = ref<Map>();
const router = useRouter();

function setupMap() {
  map.value = L.map("map").setView({ lat: 42.358945, lng: -71.093528 }, 15);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);
  markerLayer.value.addTo(map.value);
}

onMounted(setupMap);

watch(
  () => props.spaces.slice(),
  (newSpaces) => {
    markerLayer.value.clearLayers();
    for (const space of newSpaces) {
      if (space.latlng) {
        const marker = L.marker(space.latlng).bindPopup(() =>
          createSpacePopup(space)
        );
        markerLayer.value.addLayer(marker);
      }
    }
    const bounds = markerLayer.value.getBounds();
    if (bounds.isValid()) {
      map.value?.fitBounds(bounds);
    }
  }
);

function createSpacePopup(space: SpaceResponse): HTMLElement {
  const visitBtn = L.DomUtil.create("button", "btn btn-primary");
  visitBtn.innerText = "Visit Space";
  visitBtn.onclick = () => router.push(`/space/${space.place_id}`);
  const title = L.DomUtil.create("h5");
  title.innerText = space.name;
  const container = L.DomUtil.create("div");
  container.append(title, visitBtn);
  return container;
}
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 350px;
}
</style>
