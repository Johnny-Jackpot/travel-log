<script setup lang="ts">
const sidebarStore = useSidebarStore();
const { isSidebarOpen } = storeToRefs(sidebarStore);
const locationsStyle = computed(() => {
  // sidebar classes: (w-64 || w-12) + padding p-4
  const multiplier = (isSidebarOpen.value ? 64 : 12) + 4;
  return { maxWidth: `calc(100vw - var(--spacing) * ${multiplier})` };
});

const locationsStore = useLocationStore();
const { locations, status } = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.refresh();
});
</script>

<template>
  <div>
    <h2 class="text-2xl pt-4 pl-4">
      Locations
    </h2>
    <div class="p-4 overflow-auto transition-all duration-300" :style="locationsStyle">
      <div v-if="status === 'pending'">
        <span class="loading loading-spinner loading-xl" />
      </div>
      <div v-else-if="locations && locations.length > 0" class="flex flex-nowrap gap-2">
        <div
          v-for="location in locations"
          :key="location.id"
          class="card card-compact bg-base-300 h-40 w-72 shrink-0"
        >
          <div class="card-body">
            <h3 class="text-xl">
              {{ location.name }}
            </h3>
            <p>{{ location.description }}</p>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-2 mt-4">
        <p>Add a location to get started</p>
        <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
          <Icon name="tabler:circle-plus-filled" size="24" />
          Add location
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
