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
  <div class="tooltip tooltip-right" :data-tip="props.showLabel ? undefined : props.label">
    <NuxtLink
      :to="props.href"
      :class="route.path === props.href && 'bg-base-200'"
      class="flex justify-start gap-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap"
    >
      <Icon :name="props.icon" size="24" class="flex-shrink-0" />
      <span
        class="whitespace-nowrap transition-all duration-300"
        :class="props.showLabel ? 'opacity-100 w-auto' : 'opacity-0 w-0'"
      >
        {{ props.label }}
      </span>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
