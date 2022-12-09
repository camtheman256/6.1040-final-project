import { get } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { CheckInResponse } from "../../backend/checkin/util";

export const useCheckInStore = defineStore("checkIn", () => {
  const today = ref<CheckInResponse>();
  /**
   * Call the API to find Today's check-in, if available.
   */
  async function updateCheckIn() {
    const response = await get("/api/checkins/today/session");
    if (response.checkin) {
      today.value = response.checkin;
    }
  }
  return { today, updateCheckIn };
});
