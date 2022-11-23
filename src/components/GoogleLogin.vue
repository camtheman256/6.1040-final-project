<script lang="ts" setup>
import { post } from "../utils";
interface IGetUserAuthInfoResponse extends Response {
  credential: string;
}
const callback = (response: IGetUserAuthInfoResponse) => {
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
