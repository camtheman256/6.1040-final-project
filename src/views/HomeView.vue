<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import RequestsGrid from "../components/RequestsGrid.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
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
        Contributer since {{ formatDate(userStore.user.dateJoined) }}
      </p>
      <hr />
      <RequestsGrid />
    </section>
    <div v-else>
      <h1>Welcome to OurSpace!</h1>
      <h3 class="emphasized">Sign in to see your profile.</h3>
      <hr />
      <TheWelcome />
    </div>
  </main>
</template>

<style scoped>
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}

.spanned {
  display: flex;
  justify-content: space-between;
}
</style>
