<template>
  <span>
    <v-dialog v-model="dialog" width="500">

      <template v-slot:activator="{ on }">
        <v-btn
          x-small
          dark
          fab
          color="red"
          class="mr-2"
          v-on="on"
        >
          <v-icon small>delete</v-icon>
        </v-btn>
      </template>

      <v-card class="py-10">
        <v-card-text class="d-flex justify-center font-weight-black">
          本当に削除しますか？
        </v-card-text>

        <v-card-actions class="d-flex justify-space-around">
          <v-btn dark color="red" @click="handleDeleteComment">
            削除
          </v-btn>
          <v-btn @click="closeDialog" outlined>
            キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </span>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { DELETE_COMMENT, GET_THEME_COMMENTS } from '@/queries.js'
import { useMutation } from '@vue/apollo-composable'

export default defineComponent({
  props: ['comment', 'selectedThemeId'],
  setup(props, { root }) {
    // ordinary state
    const dialog = ref(false)


    // apollo state
    const { mutate: deleteComment } = useMutation(DELETE_COMMENT, {
      variables: {
        commentId: props.comment._id
      },
      update: (cache, { data: { deleteComment } }) => {
        console.log(deleteComment);
        const data = cache.readQuery({
          query: GET_THEME_COMMENTS,
          variables: {
            themeId: props.selectedThemeId,
            skip: 0,
            limit: 10
          },
        });
        console.log("dataaa", data);

        if (!data) return;
        const index = data.themeComments.comments.findIndex(comment => comment._id === props.comment._id)
        console.log("index!", index);
        data.themeComments.comments.splice(index, 1)
        console.log("deleted comments", data.themeComments);
        cache.writeQuery({
          query: GET_THEME_COMMENTS,
          variables: {
            themeId: props.selectedThemeId,
            skip: 0,
            limit: 10
          },
          data,
        });
      }
    })
    async function handleDeleteComment() {
      await deleteComment()
      showSnackbar()
      closeDialog()
    }


    // ordinary function
    function showSnackbar() {
      root.$store.commit('openSnackbar', "削除しました")
    }
    function closeDialog() {
      dialog.value = false
    }

    return {
      dialog,

      handleDeleteComment,

      closeDialog,
    }
  }
})
</script>