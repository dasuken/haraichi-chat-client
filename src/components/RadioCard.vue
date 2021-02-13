<template>
  <div>
      <v-card elevation="3" class="rounded-xl" :to="`/radio/${radio._id}`">
        <v-img :src="radio.themeImage" aspect-ratio="1.5"></v-img>
        <v-card-text>
          <div class="font-weight-bold text-h6 mb-5">
            {{radio.times}}回目のターン
            <v-icon color="orange" dark label class="ml-1" v-if="checkIfLatest(radio._id)">fiber_new</v-icon>
          </div>
          <div class="themes">
            <v-chip small v-for="theme in radio.themes" :key="theme._id" class="font-weight-semibold mb-1 dark grey darken-3 white--text lighten-1 mr-1" label>
              {{ theme.title }}
            </v-chip>
          </div>
          <div class="times d-flex justify-space-between align-center">
            <span class="font-weight-semibold grey--text text-caption">放送日: {{ boradCastOrCreatedAt(radio) | formatDate }}</span>
          </div>
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      radio: Object,
      latestRadioId: String
    },
    methods: {
      boradCastOrCreatedAt(radio) {
        return radio.boradCastingDate || radio.createdAt
      },
      checkIfLatest(radioId) {
        return radioId === this.latestRadioId
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>