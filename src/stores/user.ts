import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserResponse } from "../../backend/user/util";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserResponse>();
  const initialized = ref(false);
  function logIn(userIn: UserResponse) {
    user.value = userIn;
    initialized.value = true;
  }
  function logOut() {
    user.value = undefined;
  }
  return { user, logIn, logOut, initialized };
});
