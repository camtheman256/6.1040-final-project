<script lang="ts" setup>
import type { SpaceResponse } from "../../backend/space/util";
import { ref, computed, onMounted } from "vue";
import type { PlaceRequestResponse } from "../../backend/request/util";
import RequestInfo from "./RequestInfo.vue";
import { get } from "@/utils";

const props = defineProps<{ space: SpaceResponse }>();

const spaceRequests = ref<PlaceRequestResponse[]>([]);

const numResolved = computed(
  () => spaceRequests.value.filter((req: any) => req.resolved).length
);

const loadRequests = async () => {
  const requestsResponse = await get(
    `/api/requests?space=${props.space.place_id}`
  );
  spaceRequests.value = requestsResponse.requests;
};

defineExpose({ loadRequests });
onMounted(loadRequests);
</script>

<template>
  <div class="main-panel bg-dark text-white">
    <section class="spanned">
      <h3>Requests</h3>
      <div>
        <p class="status">
          🟢
          <span class="emphasized">{{ numResolved }} resolved requests</span>
        </p>
        <p class="status">
          ⚪
          <span class="emphasized"
            >{{ spaceRequests.length - numResolved }} unresolved requests
          </span>
        </p>
      </div>
    </section>
    <hr />
    <div>
      <div
        v-for="request in spaceRequests"
        :key="request.dateCreated"
        class="bottom-buffer"
      >
        <RequestInfo :request="request" @refreshRequests="loadRequests()" />
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
