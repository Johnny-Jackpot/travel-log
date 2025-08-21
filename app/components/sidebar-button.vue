<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
}>();

const route = useRoute();
</script>

<template>
  <NuxtLink
    :to="props.href"
    :class="{ 'bg-base-200': route.path === href }"
    class="flex justify-start gap-2 p-2 hover:bg-base-300 hover:cursor-pointer"
  >
    <Icon :name="props.icon" size="24" />
    {{ props.label }}
  </NuxtLink>
</template>

<style scoped>

</style>
