<script setup lang="ts">
import type { SpaceResponse } from "../../backend/space/util";
import type { CheckInCountsResponse } from "../../backend/checkin/util";
import { ref, onMounted } from "vue";
import { get } from "@/utils";
import UserProfile from "./UserProfile.vue";
const props = defineProps<{ space: SpaceResponse }>();

const topCheckIns = ref<CheckInCountsResponse[]>();

onMounted(async () => {
  const response = await get(`/api/checkins/count/${props.space.place_id}`);
  topCheckIns.value = response.checkInCounts;
});
</script>

<template>
  <h4>Top Check-ins:</h4>
  <ol>
    <li v-for="(rank, idx) of topCheckIns" :key="idx" class="mb-2">
      <span class="me-2">{{ idx === 0 ? " 👑" : "" }}</span>
      <UserProfile :user="rank.user" class="d-inline-flex align-middle me-2" />
      <span class="badge text-bg-danger"
        >{{ rank.count }} check-in{{ rank.count !== 1 ? "s" : "" }}</span
      >
    </li>
  </ol>
</template>
