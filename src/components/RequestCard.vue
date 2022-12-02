<script lang="ts" setup>
// TODO(porderiq): Add type of request.
const props = defineProps(["request"]);
</script>

<template>
  <div class="card text-white bg-dark" style="width: 26rem">
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
