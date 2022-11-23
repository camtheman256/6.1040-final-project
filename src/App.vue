<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./layout/NavbarComponent.vue";
</script>

<template>
  <Navbar />
  <div class="container mt-2">
    <RouterView />
  </div>
</template>
