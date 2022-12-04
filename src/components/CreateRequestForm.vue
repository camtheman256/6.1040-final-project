<script lang="ts" setup>
const onSubmit = () => {
  console.log("form submitted!");
};
</script>
<template>
  <section class="bg bg-dark text-white">
    <h4 class="bottom-buffer">Create Request</h4>
    <form class="mb-3 smallWidth">
      <div class="input-group bottom-buffer">
        <div class="btn static btn-outline-secondary" type="button">Name</div>
        <input
          type="text"
          class="form-control"
          ref="searchbox"
          placeholder="Request Name"
        />
      </div>
      <div class="input-group bottom-buffer">
        <div class="btn static btn-outline-secondary" type="button">
          Description
        </div>
        <input
          type="text"
          class="form-control"
          ref="searchbox"
          placeholder="description"
        />
      </div>
      <button class="btn btn-outline-success" type="submit" @click="onSubmit">
        Create ➕
      </button>
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
