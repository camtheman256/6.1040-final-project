<script lang="ts" setup>
const callback = (response: Response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response);
};
</script>

<template>
  <p>Login here</p>
  <!-- <div id="g_id_onload"
    data-client_id="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"
    data-login_uri="https://your.domain/your_login_endpoint"
    data-auto_prompt="false"
  ></div>
  <div class="g_id_signin"
    data-type="standard"
    data-size="large"
    data-theme="outline"
    data-text="sign_in_with"
    data-shape="rectangular"
    data-logo_alignment="left"
  ></div> -->
  <GoogleLogin :callback="callback" />
</template>
