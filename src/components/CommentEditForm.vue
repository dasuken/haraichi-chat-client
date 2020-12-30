<template>
  <div>
    <v-card>
      <v-card-title class="font-weight-black text-h5 justify-center">
        葉書を編集
      </v-card-title>

      <div v-if="error" class="ma-3">
        <ErrorMessage @clear-error="error = null" :error="error" />
      </div>

      <v-card-text>
        <v-form
          v-model="isFormValid"
          ref="form"
          @submit.prevent="handleUpdateComment"
        >

          <v-text-field
            label="ラジオネーム"
            prepend-icon="face"
            v-model="radioName"
            autocomplete="off"
            :rules="radioNameRules"
          ></v-text-field>

          <v-textarea
            label="内容"
            prepend-icon="mail"
            v-model="message"
            autocomplete="off"
            :rules="messageRules"
          ></v-textarea>

          <div class="text-center">
            <v-btn
              type="submit"
              color="orange darken-3"
              dark
              :disabled="!isFormValid"
              :loading="loading"
              >送信</v-btn
            >
          </div>
        </v-form>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { UPDATE_COMMENT, GET_THEME_COMMENTS } from "@/queries.js";
import { useMutation } from "@vue/apollo-composable";
import { ref, onMounted } from "@vue/composition-api";

import ErrorMessage from "@/components/shared/ErrorMessage";

export default {
  props: ["comment"],
  components: {
    ErrorMessage,
  },
  setup({ comment }, { root }) {
    // ordinary state
    const form        = ref(null);
    const radioName   = ref(comment.radioName);
    const message     = ref(comment.message);
    const isFormValid = ref(false);

    const radioNameRules = ref([
      (radioName) => !!radioName || "ラジオネームは必須です",
      (radioName) => radioName && radioName.length < 20 || "ラジオネームは20文字以内でお願いします。",
    ]);
    const messageRules = ref([
      (message) => !!message || "最低１文字は必要です",
      (message) => message && message.length < 200 || "200文字以内でお願いします",
    ]);
    const error = ref(null);

    // apollo function
    const { mutate: updateComment, loading } = useMutation(UPDATE_COMMENT, () => ({
      variables: {
        radioName: radioName.value,
        message: message.value,
        commentId: comment._id
      },
      update: (cache, { data: { updateComment} }) => {
        const data = cache.readQuery({
          query: GET_THEME_COMMENTS,
          variables: {
            themeId: root.$store.getters['selectedThemeId'],
            skip: 0,
            limit: 10
          },
        });
        if (!data) return;
        const index = data.themeComments.comments.findIndex(comment => {
          comment._id === updateComment._id
        });
        data.themeComments.comments.splice(index, 1, updateComment)
        cache.writeQuery({
          query: GET_THEME_COMMENTS,
          variables: {
            themeId: root.$store.getters['selectedThemeId'],
            skip: 0,
            limit: 10,
          },
          data,
        });
      },
    }));

    // ordinary function

    async function handleUpdateComment() {
      if (form.value.validate()) {
        try {
          await updateComment();
          error.value = null;
          showSnackbar()
          this.$emit("closeDialog");
          form.value.reset();
        } catch (err) {
          console.log(err.message);
          error.value = err;
        }
      }
    }
    function showSnackbar() {
      root.$store.commit('openSnackbar', "編集しました！")
    }


    onMounted(() => form.value);

    return {
      // ref state
      form,
      radioName,
      message,
      isFormValid,
      radioNameRules,
      messageRules,
      error,
      loading,

      // function
      handleUpdateComment,
    };
  },
};
</script>

<style lang="scss">
.bg-orange {
  background-color: orange!important;
  color: white!important;
}
</style>
