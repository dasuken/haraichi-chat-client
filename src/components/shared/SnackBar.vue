<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      class="mt-10 font-weight-black"
      top
      right
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="$emit('close-snack-bar')"
        >
          <v-icon>clear</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    props: ["snackbar", "text"],
  }
</script>
