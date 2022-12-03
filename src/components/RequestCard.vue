<script lang="ts" setup>
// TODO(porderiq): Add type of request.
const props = defineProps(["request"]);
const onCardClick = () =>
  // TODO(porderiq): redirect to correct view.
  console.log("Go to page for this card:", props.request);

const requestStatus = (): string => {
  if (props.request?.resolved) return "Resolved";
  if (props.request?.inProcess) return "In Progress";
  return "Not Addressed";
};

const statusStyle = {
  "bg-secondary": requestStatus() === "Not Addressed",
  "bg-warning": requestStatus() === "In Progress",
  "bg-success": requestStatus() === "Resolved",
};
</script>

<template>
  <div class="requestCard card text-white bg-dark" @click="onCardClick">
    <div class="card-body">
      <h5 class="card-title spanned">
        {{ props.request.title }}
        <span class="text-muted">
          {{ props.request.upvotingUsers.length }}
          <a href="#" class="btn btn-sm btn-primary">👍</a>
        </span>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ props.request.space }}</h6>
      <p class="card-text">
        {{ props.request.textContent }}
      </p>
      <p class="emphasized">Created {{ props.request.dateCreated }}</p>
      <div class="btn status text-white" :class="statusStyle">
        Status: {{ requestStatus() }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.requestCard {
  box-shadow: -7px -7px rgb(188, 188, 188);
}
.requestCard:hover {
  cursor: pointer;
  transform: scale(1.02);
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
