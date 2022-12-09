import { defineStore } from "pinia";
import { ref } from "vue";
import type { CheckInResponse } from "../../backend/checkin/util";

export const checkInStore = defineStore("checkIn", () => {
  const today = ref<CheckInResponse>();
  function checkIn(checkIn: CheckInResponse) {
    today.value = checkIn;
  }
  return { today, checkIn };
});
