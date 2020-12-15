<template>
  <div>
    <v-card>
      <v-card-title class="font-weight-black text-h5 justify-center">
        葉書を書こう
      </v-card-title>

      <div v-if="error" class="ma-3">
        <ErrorMessage @clear-error="error = null" :error="error" />
      </div>

      <v-card-text>
        <v-form
          v-model="isFormValid"
          ref="form"
          @submit.prevent="handleCreateComment"
        >

          <v-select
            v-model="themeId"
            :items="themes"
            item-text="title"
            item-value="_id"
            label="テーマ選択"
            prepend-icon="toc"
            :rules="selectThemeRules"
          ></v-select>

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
import { CREATE_COMMENT, GET_THEME_COMMENTS } from "@/queries.js";
import { useMutation } from "@vue/apollo-composable";
import { ref, onMounted } from "@vue/composition-api";

import ErrorMessage from "@/components/shared/ErrorMessage";

export default {
  props: ["themes"],
  components: {
    ErrorMessage,
  },
  setup() {
    // ordinary state
    const form = ref(null);
    const themeId = ref("");
    const radioName = ref("");
    const message = ref("");
    const isFormValid = ref(false);
    const selectThemeRules = ref([
      (theme) => !!theme || "テーマを選択してください",
    ]);
    const radioNameRules = ref([
      (radioName) => !!radioName || "ラジオネームは必須です",
      (radioName) =>
        radioName.length < 20 || "ラジオネームは20文字以内でお願いします。",
    ]);
    const messageRules = ref([
      (message) => !!message || "最低１文字は必要です",
      (message) => message.length < 200 || "200文字以内でお願いします",
    ]);
    const error = ref(null);

    // apollo function
    const { mutate: createComment, loading } = useMutation(CREATE_COMMENT, () => ({
      variables: {
        radioName: radioName.value,
        message: message.value,
        themeId: themeId.value,
      },
      update: (cache, { data: { createComment } }) => {
        const data = cache.readQuery({
          query: GET_THEME_COMMENTS,
          variables: {
            themeId: themeId.value,
          },
        });
        if (!data) return;
        data.themeComments.comments.unshift(createComment);
        cache.writeQuery({
          query: GET_THEME_COMMENTS,
          variables: {
            themeId: themeId.value,
          },
          data,
        });
      },
    }));

    // ordinary function

    async function handleCreateComment() {
      if (form.value.validate()) {
        try {
          await createComment();
          error.value = null;
          this.$emit("showSnackbar");
          this.$emit("closeModal");
          form.value.reset();
        } catch (err) {
          console.log(err.message);
          error.value = err;
        }
      }
    }
    function selectTheme(id) {
      themeId.value = id;
    }
    // function isSelected(id) {
    //   return themeId.value === id
    // }

    onMounted(() => form.value);

    return {
      // ref state
      form,
      themeId,
      radioName,
      message,
      isFormValid,
      selectThemeRules,
      radioNameRules,
      messageRules,
      error,
      loading,

      // function
      handleCreateComment,
      selectTheme,
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
