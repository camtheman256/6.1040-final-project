<script lang="ts" setup>
import { get, post } from "../utils";
const callback = (response: Response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response);
  get("/api").then((r) => console.log(r));
  post("/api/users/session/token-auth", response);
};
</script>

<template>
  <!-- TODO: render sign out button too -->
  <GoogleLogin :callback="callback" />
</template>
