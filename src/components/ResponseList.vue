<template>
  <div>
    <div v-if="loading" class="d-flex align-center justify-center" style="position: absolute; z-index: 100; width: 100%; margin-top: 30px;">
      <v-progress-circular
        :size="70"
        :width="7"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-row justify="end">
      <v-divider vertical></v-divider>
      <v-col cols="11">
        <response-card v-for="response in responses" :key="response._id" :response="response" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ResponseCard from '@/components/ResponseCard'
import { GET_COMMENT_RESPONSES } from '@/queries'
import { useQuery, useResult } from '@vue/apollo-composable'

  export default {
    props: {
      commentId: String
    },
    components: {
      ResponseCard,
    },
    setup({commentId}) {
      const { result, loading } = useQuery(GET_COMMENT_RESPONSES, { commentId })
      const responses = useResult(result, null, data => data.commentResponses)

      return { responses, loading }
    }
  }
</script>

<style lang="scss" scoped>

</style>