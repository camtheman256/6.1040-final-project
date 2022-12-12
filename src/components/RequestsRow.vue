<script lang="ts" setup>
import { ref } from "vue";
import type { PlaceRequestResponse } from "../../backend/request/util";
import RequestInfo from "./RequestInfo.vue";

const props = defineProps<{ spaceRequests: PlaceRequestResponse[] }>();

const numResolved = ref(
  props.spaceRequests?.filter((req: any) => req.resolved).length
);

const updateNumResolved = (incr: number) => {
  // TODO: properly update count here
  // numResolved.value += incr;
};
</script>

<template>
  <div class="main-panel bg-dark text-white">
    <section class="spanned">
      <h3>Requests</h3>
      <div>
        <p class="status">
          🟢
          <span class="emphasized">{{ numResolved }} pending requests</span>
        </p>
        <p class="status">
          ⚪
          <span class="emphasized"
            >{{ props.spaceRequests.length - numResolved }} unresolved requests
          </span>
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
        <RequestInfo
          :request="request"
          @resolvedCount="updateNumResolved($event)"
        />
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
