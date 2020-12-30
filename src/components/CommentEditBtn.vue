<template>
  <v-dialog v-model="dialog" width="500">

    <template v-slot:activator="{ on }">
      <v-btn
        x-small
        dark
        fab
        color="green"
        class="mr-2"
        v-on="on"
      >
        <v-icon small>edit</v-icon>
      </v-btn>
    </template>
    <comment-edit-form :comment="comment" @closeDialog="closeDialog" />

  </v-dialog>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import CommentEditForm from '@/components/CommentEditForm'

export default defineComponent({
  props: ['comment'],
  components: {
    CommentEditForm
  },
  setup() {
    // ordinary state
    const dialog   = ref(false)

    // ordinary function
    function closeDialog() {
      dialog.value = false
    }

    return {
      dialog,

      closeDialog,
    }
  }
})
</script>