<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          large
          color="orange darken-2 pa-2"
          v-on="on"
          style="position: fixed; right: 100px; bottom: 100px; z-index: 1"
          fab
        >
          <v-icon dark>edit</v-icon>
        </v-btn>
      </template>

      <CommentForm
        :themes="themes"
        @closeModal="closeModal"
      />
    </v-dialog>
  </div>
</template>

<script>
import CommentForm from "@/components/CommentForm";
import { ref } from "@vue/composition-api";


export default {
  props: {
    themes: Array
  },
  components: {
    CommentForm,
  },
  setup() {
    const dialog          = ref(false);

    function closeModal() {
      dialog.value = false;
    }

    return {
      dialog,

      closeModal,
    }

  }
}
</script>