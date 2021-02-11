<template>
  <div class="mb-5">
    <div class="d-flex justify-space-between">
      <div class="text-caption">
        <span class="grey--text text-caption">RN: </span>
        {{ response.radioName }}
      </div>
      <v-btn icon>
        <v-icon color="red" @click="handleDeleteResponse">delete</v-icon>
      </v-btn>
    </div>
    <div
      class="font-weight-bold andika text-subtitle-2 mt-2 mb-2"
      style="white-space: pre-wrap"
    >
      {{ response.message }}
    </div>
  </div>
</template>

<script>
import { DELETE_RESPONSE, GET_COMMENT_RESPONSES } from '@/queries'
import { useMutation } from '@vue/apollo-composable'

  export default {
    props: {
      response: Object
    },
    setup(props) {
      const { mutate: deleteResponse } = useMutation(DELETE_RESPONSE, {
        variables: {
          responseId: props.response._id
        },
        update: (cache, { data: { deleteResponse } }) => {
          console.log("deleteResponse", deleteResponse);
          const data = cache.readQuery({
              query: GET_COMMENT_RESPONSES,
              variables: {
                commentId: props.response.commentId
              }
          })

          const index = data.commentResponses.filter(res => res._id !== props.response._id)
          data.commentResponses.splice(index, 1)

          cache.writeQuery({
            query: GET_COMMENT_RESPONSES,
            variables: {
              commentId: props.response.commentId
            },
            data
          })
        }
      })

      const handleDeleteResponse = async () => {
        await deleteResponse()
      }

      return {
        handleDeleteResponse
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>