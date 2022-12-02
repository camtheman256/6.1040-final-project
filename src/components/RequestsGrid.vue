<script lang="ts" setup>
import RequestSearch from "./RequestSearch.vue";
import RequestCard from "./RequestCard.vue";
import { ref } from "vue";

// TODO: Make api call to requests for signed in user.
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
  filteredRequests.value = filter.value
    ? ownRequests.filter(
        (req) =>
          req.title.toLowerCase().includes(filter.value.toLowerCase()) ||
          req.textContent.toLowerCase().includes(filter.value.toLowerCase())
      )
    : ownRequests;
};
</script>

<template>
  <div>
    <section class="spanned">
      <h5>My Requests</h5>
      filter: {{ filter }}
      <RequestSearch @filter="updateFilter($event)" />
    </section>
    <div v-for="request in filteredRequests" :key="request.dateCreated">
      <RequestCard :request="request" />
    </div>
  </div>
</template>

<style scoped>
.spanned {
  display: flex;
  justify-content: space-between;
}
</style>
