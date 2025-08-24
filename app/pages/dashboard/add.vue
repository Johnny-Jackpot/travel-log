<script setup lang="ts">
import type { FetchError } from "ofetch";
import type { ZodTypeAny } from "zod";

import { InsertLocation } from "~~/lib/db/schema";

const router = useRouter();

const submitError = ref("");
const loading = ref(false);
const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocation as unknown as ZodTypeAny),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $fetch("/api/locations", {
      method: "post",
      body: values,
    });
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.statusMessage || "An unknown error occured.";
  }

  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (!meta.value.dirty) {
    return true;
  }
  // eslint-disable-next-line no-alert
  return window.confirm("Are you sure you want to leave? All unsaved changes will be lost.");
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
    <div v-if="submitError" role="alert" class="alert alert-error">
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        name="name" label="Name" :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        name="description" label="Description" :error="errors.description"
        type="textarea" :disabled="loading"
      />
      <AppFormField
        name="lat" label="Latitude" type="number"
        :error="errors.lat" :disabled="loading"
      />
      <AppFormField
        name="long" label="Longitude" type="number"
        :error="errors.long" :disabled="loading"
      />
      <div class="flex justify-end gap-2">
        <button
          :disabled="loading" type="button" class="btn btn-outline"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" /> Cancel
        </button>
        <button :disabled="loading" type="submit" class="btn btn-primary">
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon v-else name="tabler:circle-plus-filled" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
