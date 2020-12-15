<template>
  <div class="w-full shadow-xl mb-6">
    <youtube :video-id="videoId" fit-parent resize />
  </div>
</template>

<script>
export default {
  props: ['youtubeUrl'],
  computed: {
    videoId() {
      return this.$youtube.getIdFromUrl(this.youtubeUrl)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>