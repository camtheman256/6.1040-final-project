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
