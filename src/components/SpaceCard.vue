<script lang="ts" setup>
import { useCheckInStore } from "@/stores/checkin";
import { useRouter } from "vue-router";
import type { SpaceResponse } from "../../backend/space/util";

const props = defineProps<{ space: SpaceResponse }>();
const router = useRouter();
const checkInStore = useCheckInStore();

const onCardClick = () => router.push(`/space/${props.space?.place_id}`);

const hasWebsite = () => Boolean(props.space.website);
</script>

<template>
  <div class="requestCard card text-dark bg-light" @click="onCardClick">
    <div class="card-body">
      <div class="card-title d-flex justify-content-between">
        <h5>{{ props.space.name }}</h5>
        <div>
          <button
            class="btn btn-sm btn-outline-success"
            title="Check In"
            @click.stop="checkInStore.checkIn(space.place_id)"
            v-if="!checkInStore.today"
          >
            ✅
          </button>
          <div
            v-else-if="checkInStore.today.space === space.place_id"
            class="badge bg-success"
          >
            Checked in here
          </div>
        </div>
      </div>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ props.space.formatted_address }}
      </h6>
      <p v-if="hasWebsite()" class="card-text emphasized">
        External information
        <a :href="props.space.website" target="_blank">here</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.requestCard {
  box-shadow: -7px -7px rgb(188, 188, 188);
}
.requestCard:hover {
  cursor: pointer;
  transform: scale(1.03);
}
.spanned {
  display: flex;
  justify-content: space-between;
}
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}
.status {
  pointer-events: none;
}
</style>
