<script lang="ts" setup>
import { get } from "../utils";
import RequestSearch from "./RequestSearch.vue";
import { ref } from "vue";

// TODO: make api call to requests for signed in user.
const requests = [
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "placeId of space1",
    title: "More Bananas",
    dateCreated: "November 25th 2022, 11:04pm",
    upvotingUsers: ["u1", "u2", "u3"],
    resolved: false,
    inprogress: false,
  },
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "placeId of space2",
    title: "More Whiteboards in Stud5",
    dateCreated: "November 27th 2022, 1:56pm",
    upvotingUsers: ["u1", "u2", "u3", "u4", "u5"],
    resolved: false,
    inprogress: true,
  },
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "placeId of space3",
    title: "No coffee in course 6 lounge",
    dateCreated: "November 30th 2022, 9:06am",
    upvotingUsers: [],
    resolved: true,
    inprogress: false,
  },
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "placeId of space4",
    title: "Add Christmas tree to LCC lounge",
    dateCreated: "December 1st 2022, 9:00pm",
    upvotingUsers: ["fabrizzio"],
    resolved: true,
    inprogress: false,
  },
];
let filter = ref("");
const updateFilter = (event: string) => {
  filter.value = event;
};
</script>

<template>
  <section class="spanned">
    <h5>My Requests</h5>
    filter: {{ filter }}
    <RequestSearch @filter="updateFilter($event)" />
  </section>
</template>
