<script setup lang="ts">
const { data, status } = await useFetch("/api/locations", {
  lazy: true,
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-else-if="data">
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
    <div v-else class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
        <Icon name="tabler:circle-plus-filled" size="24" />
        Add location
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
