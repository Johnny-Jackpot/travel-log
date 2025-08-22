<script setup lang="ts">
import { InsertLocation } from "~~/lib/db/schema";

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(() => {
});
</script>

<template>
  <div class="max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Add location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to.
        It can be a city, country, or any point of interest.
        You can add specific times you visited this location after adding it.
      </p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField name="name" label="Name" :error="errors.name" />
      <AppFormField
        name="description" label="Description" :error="errors.description"
        type="textarea"
      />
      <AppFormField
        name="lat" label="Latitude" type="number"
        :error="errors.lat"
      />
      <AppFormField
        name="long" label="Longitude" type="number"
        :error="errors.long"
      />
      <div class="flex justify-end gap-2">
        <button type="button" class="btn btn-outline">
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          Add
          <Icon name="tabler:circle-plus-filled" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
