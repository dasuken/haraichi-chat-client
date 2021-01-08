<template>
  <div class="mb-5">
    <div class="d-flex justify-space-between">
      <div class="text-caption">
        <span class="grey--text text-caption">RN: </span>
        {{ response.radioName }}
      </div>
      <div class="text-caption grey--text">
        {{ response.createdAt | formatDateTime }}
      </div>
    </div>
    <div
      class="font-weight-bold andika text-subtitle-2 mt-2 mb-2"
      style="white-space: pre-wrap"
    >
      {{ response.message }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      response: Object
    },
  }
</script>

<style lang="scss" scoped>

</style>