<template>
  <div>
    <h1 class="text-center">
      <v-chip label dark color="orange" class="mb-2">最新の投稿</v-chip>
    </h1>
    <v-card  class="pa-2 rounded-md">
      <div v-for="comment in recentComments" :key="comment._id" class="mb-2">
        <div class="font-weight-bold text-subtitle-2">・{{ comment.themeId.title }}</div>
        <div class="grey--text ml-3 font-weight-semibold text-caption">{{ comment.message }}</div>
        <div class="text-right font-weight-semibold text-caption mr-4">{{ comment.radioName }}</div>
      </div>
    </v-card>
  </div>
</template>

<script>
// import { ref } from '@vue/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_COMMENTS } from '@/queries.js'
  export default {
    setup() {
      const { result} = useQuery(GET_COMMENTS, { skip: 0, limit: 8 })
      const recentComments = useResult(result, null, data => data.comments)
      return  {
        recentComments,
      }
    }
  }
</script>
