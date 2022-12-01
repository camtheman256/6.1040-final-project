<script lang="ts" setup>
import type { CallbackTypes } from "vue3-google-login";
import { post, _delete } from "../utils";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const callback: CallbackTypes.CredentialCallback = async (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  const userResponse = await post("/api/users/session/token-auth", {
    ...response,
    token: response.credential,
  });
  userStore.logIn(userResponse.user);
};

async function handleSignOut() {
  await _delete("/api/users/session/token-auth");
  userStore.logOut();
}
</script>

<template>
  <div v-if="userStore.user">
    <span class="navbar-text me-3" :title="userStore.user.email">{{
      userStore.user.name
    }}</span>
    <button class="btn btn-outline-light" @click="handleSignOut">
      Sign Out
    </button>
  </div>
  <GoogleLogin :callback="callback" v-else />
</template>
