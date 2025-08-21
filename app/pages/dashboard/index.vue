<script setup lang="ts">
const isSidebarOpen = ref(true);
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300 overflow-hidden" :class="isSidebarOpen ? 'w-64' : 'w-10'">
      <div class="flex hover:cursor-pointer hover:bg-base-200 p-2 justify-end" @click="isSidebarOpen = !isSidebarOpen">
        <Icon :name="isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'" size="32" />
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
