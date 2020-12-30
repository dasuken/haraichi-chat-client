<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      class="mt-10 font-weight-black"
      top
      right
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="closeSnackbar"
        >
          <v-icon>clear</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'

  export default {
    setup(_, { root }) {
      const snackbar     = ref(root.$store.getters['snackbar'])
      const snackbarText = ref(root.$store.getters['snackbarText'])

      watch(() => root.$store.getters['snackbar'], () => {
        snackbar.value     = root.$store.getters['snackbar']
        snackbarText.value = root.$store.getters['snackbarText']
      })

      function closeSnackbar() {
        root.$store.commit('closeSnackbar')
      }

      return {
        snackbar,
        snackbarText,
        closeSnackbar,
      }
    }
  }
</script>
