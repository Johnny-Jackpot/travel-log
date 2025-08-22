<script setup lang="ts">
const props = defineProps<{
  label: string;
  name: string;
  error?: string;
  type?: "text" | "textarea" | "number";
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="props.type || 'input'"
      :name="props.name" :type="props.type || 'text'" class="input w-full"
      :class="{
        'input-error': props.error,
        'input': !props.type || props.type === 'text',
        'textarea': props.type === 'textarea',
      }"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>

<style scoped>

</style>
