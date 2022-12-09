<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import RequestsGrid from "../components/RequestsGrid.vue";
import { useUserStore } from "@/stores/user";
import { useCheckInStore } from "@/stores/checkin";
import { RouterLink } from "vue-router";

const userStore = useUserStore();
const checkInStore = useCheckInStore();
const getFirstName = (fullname: string): string =>
  fullname.substring(0, fullname.indexOf(" "));
const formatDate = (dateString: string): string =>
  dateString.substring(0, dateString.indexOf(","));
</script>

<template>
  <main>
    <section v-if="userStore.user">
      <h2>
        Welcome,
        {{ getFirstName(userStore.user.name) }}
      </h2>
      <p class="emphasized">
        Contributor since {{ formatDate(userStore.user.dateJoined) }}
      </p>
      <p v-if="checkInStore.today">
        You checked in to a space today at {{ checkInStore.today.date }} for the
        {{ checkInStore.today.count }} time. Thanks!
      </p>
      <p v-else>
        <b>You haven't checked in today!</b>&nbsp;
        <RouterLink to="/spaces">Visit the Spaces page to check in.</RouterLink>
      </p>
      <hr />
      <RequestsGrid />
    </section>
    <div v-else-if="userStore.initialized">
      <h1>Welcome to OurSpace!</h1>
      <h3 class="emphasized">Sign in to see your profile.</h3>
      <hr />
      <TheWelcome />
    </div>
    <div class="d-flex gap-3" v-else>
      <div class="spinner-border"></div>
      <h2>Loading</h2>
    </div>
  </main>
</template>

<style scoped>
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}
</style>
