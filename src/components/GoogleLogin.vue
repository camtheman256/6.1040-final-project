<script lang="ts" setup>
const callback = (response: Response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response);
};
</script>

<template>
  <!-- TODO: render sign out button too -->
  <GoogleLogin :callback="callback" />
</template>
