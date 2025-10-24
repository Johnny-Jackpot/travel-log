<script lang="ts" setup>
import { CENTER_UA } from "~~/lib/constants";

const colorMode = useColorMode();
const mapStore = useMapStore();

const style = computed(() => {
  return colorMode.value === "light"
    ? "/styles/light-map.json"
    : "/styles/dark-map.json";
});
const zoom = 4;

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <div v-bind="$attrs" class="relative w-full h-full">
    <MglMap
      :map-style="style"
      :center="CENTER_UA"
      :zoom="zoom"
    >
      <MglNavigationControl />
      <MglMarker v-for="point in mapStore.mapPoints" :key="point.id" :coordinates="[point.long, point.lat]">
        <template #marker>
          <div class="tooltip tooltip-top" :data-tip="point.label">
            <Icon name="tabler:map-pin-filled" class="text-secondary" size="30" />
          </div>
        </template>
      </MglMarker>
    </MglMap>
  </div>
</template>
