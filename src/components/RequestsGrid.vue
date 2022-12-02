<script lang="ts" setup>
import RequestSearch from "./RequestSearch.vue";
import RequestCard from "./RequestCard.vue";
// import { useUserStore } from "@/stores/user";
// import { get } from "../utils";
import { ref } from "vue";

// TODO(porderique): Replace fake data with api call for signed in user.
// const userStore = useUserStore();
// const ownRequests = userStore.user
//   ? await get(`/api/api/requests?user=${userStore.user.gapiUserId}`)
//   : [];
const ownRequests = [
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "placeId of space1",
    title: "More Bananas",
    textContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, mollit anim id est laborum.",
    dateCreated: "November 25th 2022, 11:04pm",
    upvotingUsers: ["u1", "u2", "u3"],
    resolved: false,
    inProcess: false,
  },
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "placeId of space2",
    title: "More Whiteboards in Stud5",
    textContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, mollit anim id est laborum.",
    dateCreated: "November 27th 2022, 1:56pm",
    upvotingUsers: ["u1", "u2", "u3", "u4", "u5"],
    resolved: false,
    inProcess: true,
  },
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "placeId of space3",
    title: "No coffee in course 6 lounge",
    textContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, mollit anim id est laborum.",
    dateCreated: "November 30th 2022, 9:06am",
    upvotingUsers: [],
    resolved: true,
    inProcess: false,
  },
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "placeId of space4",
    title: "Add Christmas tree to LCC lounge",
    textContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, mollit anim id est laborum.",
    dateCreated: "December 1st 2022, 9:00pm",
    upvotingUsers: ["fabrizzio"],
    resolved: true,
    inProcess: false,
  },
];
const filter = ref("");
const filteredRequests = ref(ownRequests);
const updateFilter = (event: string) => {
  filter.value = event;
  filteredRequests.value = ownRequests.filter(
    (req) =>
      req.title.toLowerCase().includes(filter.value.toLowerCase()) ||
      req.textContent.toLowerCase().includes(filter.value.toLowerCase())
  );
};
</script>

<template>
  <div>
    <section class="spanned">
      <h5>My Requests</h5>
      filter: {{ filter }}
      <RequestSearch @filter="updateFilter($event)" />
    </section>
    <div
      class="row bottom-buffer"
      v-for="index in Math.floor(
        // 3 columns per row
        filteredRequests.length / 3 + (filteredRequests.length % 3 != 0 ? 1 : 0)
      )"
      :key="index"
    >
      <div class="col-sm-4" v-if="3 * (index - 1) < filteredRequests.length">
        <RequestCard :request="filteredRequests[3 * (index - 1)]" />
      </div>
      <div
        class="col-sm-4"
        v-if="3 * (index - 1) + 1 < filteredRequests.length"
      >
        <RequestCard :request="filteredRequests[3 * (index - 1) + 1]" />
      </div>
      <div
        class="col-sm-4"
        v-if="3 * (index - 1) + 2 < filteredRequests.length"
      >
        <RequestCard :request="filteredRequests[3 * (index - 1) + 2]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.spanned {
  display: flex;
  justify-content: space-between;
}

.bottom-buffer {
  margin-bottom: 1rem;
}
</style>
