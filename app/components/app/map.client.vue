<script lang="ts" setup>
const style = "https://api.maptiler.com/maps/bright-v2/style.json?key=dt1Vuq0B2XZkQVL3jHXV";
const center = [30.559482, 48.21322];
const zoom = 4;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
