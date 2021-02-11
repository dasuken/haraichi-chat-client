<template>
  <v-dialog v-model="dialog" width="500">

    <template v-slot:activator="{ on }">
      <v-btn
        small
        tile
        color="white grey--text"
        class="mr-2 ml-n4 d-flex aling-center"
        elevation="0"
        v-on="on"
      >
        <v-icon dark>rate_review</v-icon>
        コメントする
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        コメントを書く
      </v-card-title>
      <v-card-text>
        <v-form class="text-right" ref="form" @submit.prevent="handleCreateResponse" v-model="isFormValid">
          <v-text-field label="RN:" filled v-model="radioName" :rules="radioNameRules"></v-text-field>
          <v-textarea rows="3" outlined label="コメント:" v-model="message" :rules="messageRules"></v-textarea>
          <v-btn dark class="mt-n6 mb-4" @click="handleCreateResponse" :disabled="!isFormValid" :loading="loading">コメント</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script>
import { CREATE_RESPONSE, GET_COMMENT_RESPONSES } from '@/queries.js'
import { useMutation } from '@vue/apollo-composable'
import { ref, onMounted } from '@vue/composition-api'

  export default {
    props: {
      commentId: String,
    },
    setup({ commentId }, { root }) {
      const dialog      = ref(false)
      const message     = ref('')
      const radioName   = ref('')
      const form        = ref(null);
      onMounted(() => form.value);
      const isFormValid = ref(false);

      const radioNameRules = ref([
      (radioName) => !!radioName || "ラジオネームは必須です",
      (radioName) => radioName && radioName.length < 20 || "ラジオネームは20文字以内でお願いします。",
      ]);
      const messageRules = ref([
        (message) => !!message || "最低１文字は必要です",
        (message) => message && message.length < 200 || "100文字以内でお願いします",
      ]);

      // apollo mutation
      const { mutate: createResponse, loading } = useMutation(CREATE_RESPONSE, () => ({
        variables: {
          radioName: radioName.value,
          message: message.value,
          commentId,
          userId: root.$store.getters['userId']
        },
        update: (cache, { data: { createResponse } }) => {
          const data = cache.readQuery({
            query: GET_COMMENT_RESPONSES,
            variables: {
              commentId
            },
          });

          if (!data) return;
          data.commentResponses.unshift(createResponse);
          cache.writeQuery({
            query: GET_COMMENT_RESPONSES,
            variables: {
              commentId
            },
            data,
          });
        },
      }));
      async function handleCreateResponse() {
        await createResponse()
        dialog.value = false
      }


      return {
          form,
          message,
          radioName,
          isFormValid,
          radioNameRules,
          messageRules,
          dialog,

          handleCreateResponse,
          loading,
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>