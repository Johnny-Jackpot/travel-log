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
      :class="route.path === href && 'bg-base-200'"
      class="flex justify-start gap-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap"
    >
      <Icon :name="props.icon" size="24" class="flex-shrink-0" />
      <Transition name="grow">
        <span v-show="props.showLabel" class="whitespace-nowrap">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.3s;
}

.grow-leave-active {
  animation: grow 0.1s reverse;
}

@keyframes grow {
  0% {
    opacity: 0;
    width: 0;
  }

  100% {
    opacity: 1;
    width: auto;
  }
}
</style>
