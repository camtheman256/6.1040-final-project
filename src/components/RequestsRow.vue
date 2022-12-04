<script lang="ts" setup>
import { computed } from "vue";
import type { PlaceRequestResponse } from "../../backend/request/util";
import RequestInfo from "./RequestInfo.vue";

const props = defineProps<{ spaceRequests: PlaceRequestResponse[] }>();

const numPending = computed(
  () => props.spaceRequests?.filter((req: any) => req.inProcess).length
);

const numUnresolved = computed(
  () =>
    props.spaceRequests?.filter((req: any) => !req.isPending && !req.resolved)
      .length
);
</script>

<template>
  <div class="main-panel bg-dark text-white">
    <section class="spanned">
      <h3>Requests</h3>
      <div>
        <p class="status">
          🟡
          <span class="emphasized">{{ numPending }} pending requests</span>
        </p>
        <p class="status">
          🔴
          <span class="emphasized"
            >{{ numUnresolved }} unresolved requests</span
          >
        </p>
      </div>
    </section>
    <hr />
    <div>
      <div
        v-for="request in props.spaceRequests"
        :key="request.dateCreated"
        class="bottom-buffer"
      >
        <!-- {{ request.title }} -->
        <RequestInfo :request="request" />
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

.status {
  margin-bottom: 0;
  margin-right: 1rem;
}

.emphasized {
  font-style: italic;
  color: rgb(142, 142, 142);
}

.main-panel {
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 2rem;
  padding: 20px;
  border-radius: 20px;
  box-shadow: -7px -7px rgb(141, 141, 141);
}
</style>
