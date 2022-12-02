<script lang="ts" setup>
// TODO(porderiq): Add type of request.
const props = defineProps(["request"]);
const onCardClick = () =>
  // TODO(porderiq): redirect to correct view.
  console.log("Go to page for this card:", props.request);
</script>

<template>
  <div class="requestCard card text-white bg-dark" @click="onCardClick">
    <div class="card-body">
      <h5 class="card-title spanned">
        {{ props.request.title }}
        <span class="text-muted">
          {{ props.request.upvotingUsers.length }}
          <a href="#" class="btn btn-sm btn-primary">▲</a>
        </span>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ props.request.space }}</h6>
      <p class="card-text">
        {{ props.request.textContent }}
      </p>
      <p class="emphasized">{{ props.request.dateCreated }}</p>
      <div
        v-if="props.request.resolved"
        class="bg-success btn status text-white"
      >
        Resolved
      </div>
      <div
        v-else-if="props.request.inProcess"
        class="bg-warning btn status text-white"
      >
        In Progress
      </div>
      <div v-else class="bg-secondary btn status text-white">Not Addressed</div>
    </div>
  </div>
</template>

<style scoped>
.requestCard {
  box-shadow: -7px -7px rgb(188, 188, 188);
}
.requestCard:hover {
  cursor: pointer;
  box-shadow: -10px -10px rgb(188, 188, 188);
}
.spanned {
  display: flex;
  justify-content: space-between;
}
.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}
.status {
  pointer-events: none;
}
</style>
