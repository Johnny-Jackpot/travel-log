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
    class="flex w-48 justify-start gap-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap"
    :to="props.href" :class="route.path === href && 'bg-base-200'"
  >
    <Icon :name="props.icon" size="24" />
    {{ props.label }}
  </NuxtLink>
</template>

<style scoped>

</style>
