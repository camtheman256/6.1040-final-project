<script setup lang="ts">
import SpaceInfo from "../components/SpaceInfo.vue";
import RequestsRow from "../components/RequestsRow.vue";
import CreateRequestForm from "../components/CreateRequestForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.params);

// TODO: GET request space by route params :id
const space = {
  _id: "123abc",
  place_id: route.params.id,
  formatted_address: "77 Massachusetts Avenue",
  formatted_phone_number: "617-123-4567",
  name: "MIT Student Center",
  photos: [
    "https://lh3.googleusercontent.com/p/AF1QipMXp5sa1H3ieYFaNYzb45wAIJ2hrpMxmuLRTNv-=s680-w680-h510",
    "https://lh3.googleusercontent.com/p/AF1QipOe4eNhGyqGAbhz9RHejRxygWfXVSjhmAgLIutx=s680-w680-h510",
  ],
  url: "to google maps?",
  website: "https://studentlife.mit.edu/cac/stratton-student-center",
};

// TODO: GET requests for this space :id
const spaceRequests = [
  {
    author: "signed-in-user's-googleAuth-userId-token",
    space: "space_id",
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
    space: "space_id",
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
    space: "space_id",
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
    space: "space_id",
    title: "Add Christmas tree to LCC lounge",
    textContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, mollit anim id est laborum.",
    dateCreated: "December 1st 2022, 9:00pm",
    upvotingUsers: ["fabrizzio"],
    resolved: true,
    inProcess: false,
  },
];
</script>

<template>
  <main>
    <section v-if="space">
      <div class="row">
        <div class="col-4">
          <div class="row bottom-buffer">
            <SpaceInfo :space="space" />
          </div>
          <div class="row">
            <CreateRequestForm />
          </div>
        </div>
        <div class="col-8">
          <RequestsRow :space-requests="spaceRequests" />
        </div>
      </div>
    </section>

    <section v-else>
      <h2>No space with id {{ $route.params.id }}</h2>
    </section>
  </main>
</template>

<style scoped>
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}

.bottom-buffer {
  margin-bottom: 1rem;
}
</style>
