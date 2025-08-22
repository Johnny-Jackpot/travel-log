<script setup lang="ts">

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
    <form class="flex flex-col gap-2">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Name
        </legend>
        <input name="name" type="text" class="input w-full">
        <!-- <p class="label">
          Optional
        </p> -->
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Description
        </legend>
        <textarea name="description" type="text" class="input w-full h-24" />
        <!-- <p class="label">
          Optional
        </p> -->
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Latitude
        </legend>
        <input name="lat" type="number" class="input w-full">
        <!-- <p class="label">
          Optional
        </p> -->
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Longitude
        </legend>
        <input name="long" type="number" class="input w-full">
        <!-- <p class="label">
          Optional
        </p> -->
      </fieldset>
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
