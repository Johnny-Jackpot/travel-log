<script setup lang="ts">

</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 w-64">
      <div class="flex justify-end">
        <Icon name="tabler:chevron-left" size="42" />
      </div>
      <div class="flex flex-col">
        <SidebarButton label="Locations" icon="tabler:map" href="/dashboard" />
        <SidebarButton label="Add Location" icon="tabler:circle-plus-filled" href="/dashboard/add" />
        <div class="divider" />
        <SidebarButton label="Sign Out" icon="tabler:logout-2" href="/sign-out" />
      </div>
    </div>
    <div class="flex-1" />
  </div>
</template>

<style scoped>

</style>
