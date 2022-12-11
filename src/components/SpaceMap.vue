<script setup lang="ts">
import type { SpaceResponse } from "../../backend/space/util";
import L, { FeatureGroup, Icon, LayerGroup, Map } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/leaflet.css";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCheckInStore } from "@/stores/checkin";
import { useUserStore } from "@/stores/user";

const props = defineProps<{ spaces: SpaceResponse[] }>();
const markerLayer = ref<FeatureGroup>(L.featureGroup());
const map = ref<Map>();
const router = useRouter();
const checkInStore = useCheckInStore();
const userStore = useUserStore();

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
        const marker = L.marker(space.latlng, {
          icon: new Icon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIconRetina,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30],
          }),
        }).bindPopup(() => createSpacePopup(space));
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
  const btnsContainer = L.DomUtil.create("div", "btn-group");

  const visitBtn = L.DomUtil.create("button", "btn btn-primary");
  visitBtn.innerText = "Visit Space";
  visitBtn.onclick = () => router.push(`/space/${space.place_id}`);
  btnsContainer.append(visitBtn);

  if (!checkInStore.today && userStore.user) {
    const checkInBtn = L.DomUtil.create("button", "btn btn-success");
    checkInBtn.innerText = "✅ Check In";
    checkInBtn.onclick = () => {
      checkInStore.checkIn(space.place_id);
      window.alert("Checked in!");
    };
    btnsContainer.append(checkInBtn);
  }

  const title = L.DomUtil.create("h5");
  title.innerText = space.name;

  const container = L.DomUtil.create("div");
  container.append(title);
  if (checkInStore.today && checkInStore.today.space == space.place_id) {
    const checkedInBadge = L.DomUtil.create("div", "badge bg-success me-3");
    checkedInBadge.innerText = "Checked in here";
    container.append(checkedInBadge);
  }
  container.append(btnsContainer);
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
