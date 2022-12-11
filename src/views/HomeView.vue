<script setup lang="ts">
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
      <section class="welcome">
        <h1>
          Welcome,
          {{ getFirstName(userStore.user.name) }}
        </h1>
        <h5 class="emphasized">
          Contributor since {{ formatDate(userStore.user.dateJoined) }}
        </h5>
        <p v-if="checkInStore.today">
          You checked in to {{ checkInStore.today.space.name }} today at
          {{ checkInStore.today.date }} for the
          {{ checkInStore.today.count }} time. Thanks!
        </p>
        <p v-else>
          <b>You haven't checked in today!</b>&nbsp;
          <RouterLink to="/spaces"
            >Visit the Spaces page to check in.</RouterLink
          >
        </p>
      </section>
      <hr />
      <RequestsGrid />
    </section>

    <div v-else-if="userStore.initialized">
      <section class="welcome">
        <h1>Welcome to 🎯OurSpace</h1>
        <h4>
          Create, discover, and contribute to crowdsourcing efforts for a better
          community, today.
        </h4>
        <h5 class="emphasized">Sign in to see your profile.</h5>
      </section>
      <hr />
      <RequestsGrid />
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

.welcome {
  padding: 2rem 0;
  animation: fadeIn 1s ease-in both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
