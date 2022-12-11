<script setup lang="ts">
import type { SpaceResponse } from "../../backend/space/util";
import L, { FeatureGroup, Icon, LayerGroup, Map } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/leaflet.css";
import { onMounted, ref, watch, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { useCheckInStore } from "@/stores/checkin";
import { useUserStore } from "@/stores/user";

const props = defineProps<{ spaces: SpaceResponse[] }>();
const markerLayer = shallowRef<FeatureGroup>(L.featureGroup());
const map = shallowRef<Map>();
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
  const container = L.DomUtil.create("div");
  const btnsContainer = L.DomUtil.create("div", "btn-group");

  const visitBtn = L.DomUtil.create("button", "btn btn-primary", btnsContainer);
  visitBtn.innerText = "Visit Space";
  visitBtn.onclick = () => router.push(`/space/${space.place_id}`);

  if (!checkInStore.today && userStore.user) {
    const checkInBtn = L.DomUtil.create(
      "button",
      "btn btn-success",
      btnsContainer
    );
    checkInBtn.innerText = "✅ Check In";
    checkInBtn.onclick = () => {
      checkInStore.checkIn(space.place_id);
      window.alert("Checked in!");
    };
  }

  const title = L.DomUtil.create("h5", "", container);
  title.innerText = space.name;

  if (space.totalCheckInCount !== undefined) {
    const checkinsTotal = L.DomUtil.create("h6", "", container);
    checkinsTotal.innerText = `${space.totalCheckInCount} total check-in${
      space.totalCheckInCount !== 1 ? "s" : ""
    }`;
  }

  if (space.localLegend !== undefined) {
    const legendContainer = L.DomUtil.create(
      "div",
      "d-flex gap-2 align-items-center mb-1",
      container
    );
    const legendImage = L.DomUtil.create(
      "img",
      "rounded-circle",
      legendContainer
    );
    legendImage.src = space.localLegend.imageUrl;
    legendImage.height = 25;
    const legendName = L.DomUtil.create("span", "", legendContainer);
    legendName.innerText =
      "👑 " +
      (userStore.user?.gapiUserId === space.localLegend.gapiUserId
        ? "You"
        : space.localLegend.name) +
      ` (${space.localLegendCount} check-in${
        space.localLegendCount !== 1 ? "s" : ""
      })`;
  }

  if (
    checkInStore.today &&
    checkInStore.today.space.place_id == space.place_id
  ) {
    const checkedInBadge = L.DomUtil.create(
      "div",
      "badge bg-success me-3",
      container
    );
    checkedInBadge.innerText = "Checked in here";
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
