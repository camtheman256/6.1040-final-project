<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { post } from "@/utils";
import { ref } from "vue";

const props = defineProps<{ place_id: string }>();

const userStore = useUserStore();

const emit = defineEmits<{ (event: "created"): void }>();
const name = ref<string>();
const description = ref<string>();

const onSubmit = async () => {
  await post(`/api/requests/${props.place_id}`, {
    author: userStore.user?.gapiUserId,
    space: props.place_id,
    title: name.value,
    textContent: description.value,
    tags: [],
    anonymous: false,
  });
  emit("created");
  name.value = "";
  description.value = "";
};
</script>
<template>
  <section class="bg bg-dark text-white">
    <h4 class="bottom-buffer">Create Request</h4>
    <form class="mb-3 smallWidth" @submit.prevent="onSubmit">
      <div class="input-group bottom-buffer">
        <div class="btn static btn-outline-secondary" type="button">Name</div>
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="Request Name"
          required
        />
      </div>
      <div class="form-group bottom-buffer">
        <textarea
          class="form-control"
          v-model="description"
          placeholder="Description"
          required
        />
        <small class="text-light"
          >Supports
          <a
            class="link-light"
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            >Markdown</a
          ></small
        >
      </div>
      <button class="btn btn-outline-success" type="submit">Create ➕</button>
    </form>
  </section>
</template>

<style scoped>
.smallWidth {
  width: 100%;
  min-width: 15em;
}
.static {
  pointer-events: none;
}

.bg {
  width: 400px;
  width: 100%;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: -7px -7px rgb(141, 141, 141);
}

.bottom-buffer {
  margin-bottom: 2rem;
}
</style>
