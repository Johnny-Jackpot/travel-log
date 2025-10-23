<script lang="ts" setup>
import { CENTER_UA } from "~~/lib/constants";

const colorMode = useColorMode();
const style = computed(() => {
  return colorMode.value === "light"
    ? "/styles/light-map.json"
    : "/styles/dark-map.json";
});
const zoom = 4;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_UA"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
