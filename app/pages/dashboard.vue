<script setup lang="ts">
const sidebarStore = useSidebarStore();
const { isSidebarOpen } = storeToRefs(sidebarStore);
const locationsStore = useLocationStore();
const route = useRoute();
const showSidebar = ref(false);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
  showSidebar.value = true;
  if (route.path !== "dashboard") {
    locationsStore.refresh();
  }
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div v-show="showSidebar" class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300 shrink-0" :class="isSidebarOpen ? 'w-64' : 'w-12'">
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 py-2 px-1" :class="isSidebarOpen ? 'justify-end' : 'justify-start'"
        @click="toggleSidebar"
      >
        <Icon :name="isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'" size="32" />
      </div>
      <div class="flex flex-col">
        <SidebarButton
          :show-label="isSidebarOpen" label="Locations" icon="tabler:map"
          href="/dashboard"
        />
        <SidebarButton
          :show-label="isSidebarOpen" label="Add Location" icon="tabler:circle-plus-filled"
          href="/dashboard/add"
        />
        <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />
        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-4 w-full" />
        </div>
        <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length" class="flex flex-col">
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :show-label="isSidebarOpen"
            :label="item.label"
            :icon="item.icon"
            :href="item.href"
          />
        </div>
        <div class="divider" />
        <SidebarButton
          :show-label="isSidebarOpen" label="Sign Out" icon="tabler:logout-2"
          href="/sign-out"
        />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
      <AppMap class="w-full" />
    </div>
  </div>
</template>

<style scoped>

</style>
