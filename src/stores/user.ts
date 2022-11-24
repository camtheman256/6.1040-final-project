import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserResponse } from "../../backend/user/util";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserResponse>();
  function logIn(userIn: UserResponse) {
    user.value = userIn;
  }
  function logOut() {
    user.value = undefined;
  }
  return { user, logIn, logOut };
});
