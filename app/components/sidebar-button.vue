<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
}>();

const route = useRoute();
</script>

<template>
  <div class="tooltip tooltip-right" :data-tip="props.label">
    <NuxtLink
      class="flex w-64 justify-start gap-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap"
      :to="props.href" :class="route.path === href && 'bg-base-200'"
    >
      <Icon :name="props.icon" size="24" />
      {{ props.label }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.1s;
}

.grow-leave-active {
  animation: grow 0.1s reverse;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
