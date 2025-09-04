<script setup lang="ts">

</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div class="flex flex-col gap-2 mt-4">
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
