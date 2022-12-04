<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import GoogleLogin from "../components/GoogleLogin.vue";
import { Collapse } from "bootstrap";

const navLinks = [
  {
    route: "/about",
    label: "About",
  },
  {
    route: "/spaces",
    label: "Spaces",
  },
  {
    route: "/place-search",
    label: "Place Search",
  },
];

const activeRoute = useRoute();
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">🎯 OurSpace</RouterLink>
      <button
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarContent">
        <ul class="navbar-nav me-auto">
          <li
            class="nav-item"
            v-for="{ route, label } of navLinks"
            :key="route"
          >
            <RouterLink
              class="nav-link"
              :class="{ active: activeRoute.path === route }"
              :to="route"
              >{{ label }}</RouterLink
            >
          </li>
        </ul>
        <GoogleLogin />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--theme-color);
}
</style>
