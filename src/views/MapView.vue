<script setup lang="ts">
import SpacesGrid from "../components/SpacesGrid.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const getFirstName = (fullname: string): string =>
  fullname.substring(0, fullname.indexOf(" "));
const formatDate = (dateString: string): string =>
  dateString.substring(0, dateString.indexOf(","));
</script>

<template>
  <main>
    <section>
      <h3>Map View</h3>
      <div class="emphasized">**map display here**</div>
      <hr />
      <SpacesGrid />
    </section>
  </main>
</template>

<style scoped>
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}
</style>
