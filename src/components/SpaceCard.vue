<script lang="ts" setup>
import { useRouter } from "vue-router";

const props = defineProps(["space"]);
const router = useRouter();

const onCardClick = () => router.push(`/space/${props.space?.place_id}`);

const hasWebsite = () => Boolean(props.space.website);
</script>

<template>
  <div class="requestCard card text-dark bg-light" @click="onCardClick">
    <div class="card-body">
      <h5 class="card-title">
        {{ props.space.name }}
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ props.space.formatted_address }}
      </h6>
      <p v-if="hasWebsite()" class="card-text emphasized">
        External information <a :href="props.space.website">here</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.requestCard {
  box-shadow: -7px -7px rgb(188, 188, 188);
}
.requestCard:hover {
  cursor: pointer;
  transform: scale(1.03);
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
