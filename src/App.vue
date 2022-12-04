<script setup lang="ts">
import type { UserResponse } from "../backend/user/util";
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./layout/NavbarComponent.vue";
import { useUserStore } from "./stores/user";
import { get } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";

const userStore = useUserStore();

onMounted(async () => {
  const userResponse: { user: UserResponse } = await get("/api/users/session");
  userStore.logIn(userResponse.user);
});
</script>

<template>
  <Navbar />
  <div class="container mt-2">
    <RouterView />
  </div>
</template>
