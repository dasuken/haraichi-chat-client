<template>
  <div>
    <div class="mb-3 ">
      <div class="font-weight-black text-h6 mx-3 text-center">
        {{radio.times}}回目のターン
        <v-icon color="orange" dark label class="ml-1" v-if="checkIfLatest(radio._id)">fiber_new</v-icon>
      </div>
    </div>
    <v-hover slot="{ hover }">
      <v-card elevation="6" class="rounded-xl" :to="`/radio/${radio._id}`">
        <v-img :src="radio.themeImage" aspect-ratio="1.5"></v-img>
        <v-card-text>
          <div class="times d-flex justify-space-between align-center mb-2">
            <span class="font-weight-semibold grey--text">放送日: {{ boradCastOrCreatedAt(radio) | formatDate }}</span>
          </div>
          <div class="text-subtitle-2 font-weight-black mb-1">テーマ 一覧</div>
          <div class="themes">
            <v-chip v-for="theme in radio.themes" :key="theme._id" class="font-weight-semibold mb-1 dark orange white--text mr-1 rounded-lg" label>
              {{ theme.title }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
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