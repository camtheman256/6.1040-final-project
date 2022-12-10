<script setup lang="ts">
import type { UserResponse } from "../backend/user/util";
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./layout/NavbarComponent.vue";
import { useUserStore } from "./stores/user";
import { useCheckInStore } from "./stores/checkin";
import { get } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";

const userStore = useUserStore();
const checkInStore = useCheckInStore();

onMounted(async () => {
  const userResponse: { user: UserResponse } = await get("/api/users/session");
  userStore.logIn(userResponse.user);
  checkInStore.updateCheckIn();
});
</script>

<template>
  <Navbar />
  <div class="container mt-2">
    <RouterView />
  </div>
</template>
