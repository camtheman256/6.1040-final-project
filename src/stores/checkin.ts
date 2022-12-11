import { get, post } from "@/utils";
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
  /**
   * Check-in user to the desired space
   */
  async function checkIn(placeId: string) {
    const response = await post(`/api/checkins/session/${placeId}`, {});
    if (response.checkin) {
      today.value = response.checkin;
    }
  }
  /**
   * Clear check-in store, such as when a user logs out
   */
  function clear() {
    today.value = undefined;
  }
  return { today, updateCheckIn, checkIn, clear };
});
