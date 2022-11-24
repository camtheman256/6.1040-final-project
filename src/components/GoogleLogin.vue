<script lang="ts" setup>
import type { CallbackTypes } from "vue3-google-login";
import { post } from "../utils";

const callback: CallbackTypes.CredentialCallback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  post("/api/users/session/token-auth", {
    ...response,
    token: response.credential,
  });
};
</script>

<template>
  <!-- TODO: render sign out button too -->
  <GoogleLogin :callback="callback" />
</template>
