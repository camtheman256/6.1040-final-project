<script lang="ts" setup>
import { useCheckInStore } from "@/stores/checkin";
import { useUserStore } from "@/stores/user";
import type { SpaceResponse } from "../../backend/space/util";

const props = defineProps<{ space: SpaceResponse }>();
const checkInStore = useCheckInStore();
const userStore = useUserStore();
</script>

<template>
  <section class="main-info bg-dark text-white">
    <img
      v-if="props.space.photos"
      class="main-img bottom-buffer"
      :src="props.space.photos[0]"
    />
    <h3>{{ props.space.name }}</h3>
    <div class="emphasized spanned">
      <p>{{ props.space.formatted_address }}</p>
      <p>{{ props.space.formatted_phone_number }}</p>
    </div>
    <div v-if="userStore.user">
      <button
        v-if="!checkInStore.today"
        class="btn btn-success mb-3"
        @click="checkInStore.checkIn(space.place_id)"
      >
        ✅ Check In Here
      </button>
      <p
        v-else-if="checkInStore.today.space.place_id === space.place_id"
        class="badge bg-success"
      >
        Checked in here today!
      </p>
    </div>
  </section>
</template>

<style scoped>
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}
.main-info {
  border-radius: 20px;
  margin-top: 2rem;
  box-shadow: -7px -7px rgb(141, 141, 141);
}

.main-img {
  width: 100%;
  border-radius: 20px;
  margin-top: 1rem;
}

.bottom-buffer {
  margin-bottom: 1rem;
}

.spanned {
  display: flex;
  justify-content: space-between;
}
</style>
