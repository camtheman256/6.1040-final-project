<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const myStore = useCounterStore();
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ myStore.$state.count }}</p>
    <button @click="myStore.increment()">More!</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.about {
  flex-direction: column;
  justify-content: center;
}
</style>
