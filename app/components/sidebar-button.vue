<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div
    class="tooltip tooltip-right"
    :data-tip="props.showLabel ? undefined : props.label"
  >
    <NuxtLink
      :to="props.href"
      :class="[
        route.path === href && 'bg-base-200',
        props.showLabel ? 'justify-start' : 'justify-center',
      ]"
      class="flex  gap-2 p-2 hover:bg-base-300 hover:cursor-pointer"
    >
      <Icon :name="props.icon" size="24" />
      <span v-show="props.showLabel">{{ props.label }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
