<template>
  <div>
    <v-alert type="error">
      <v-row align="center">
        <v-col class="shrink"><v-icon>info</v-icon></v-col>
        <v-col class="grow">{{ error.message | formatErrorMessage }}</v-col>
        <v-col class="shrink"><v-btn fav text @click="$emit('clear-error')"><v-icon>cancel</v-icon></v-btn></v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
  export default {
    props: ['error'],
  }
</script>