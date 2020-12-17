<template>
  <div>
    <v-card class="mt-5 rounded-lg py-2">

      <h2 class="font-weight-black text-center mb-2 mplus">テーマ：  {{themeTitle}}</h2>

      <div
        v-for="comment in comments"
        :key="comment._id"
      >
        <CommentCard :comment="comment" />
      </div>

      <div v-if="loading" class="d-flex align-center justify-center" style="position: absolute; z-index: 100; width: 100%; margin-top: 30px;">
        <v-progress-circular
          :size="70"
          :width="7"
          color="orange"
          indeterminate
        ></v-progress-circular>
      </div>

      <div v-if="hasMore" class="text-center" tile>
        <v-btn small dark fab color="black" @click="loadMore">
          <v-icon dark>expand_more</v-icon>
        </v-btn>
      </div>

    </v-card>
  </div>
</template>

<script>
import { GET_THEME_COMMENTS, GET_THEME } from '@/queries.js'
import { useQuery, useResult } from '@vue/apollo-composable'
import { watch, ref }               from '@vue/composition-api'
import CommentCard             from "@/components/CommentCard"

import { mapGetters } from "vuex";

export default {
  props: ['themeId'],
  components: {
    CommentCard
  },
  computed: {
    ...mapGetters(["likedCommentIds"]),
  },
  setup (props) {
    const skip  = ref(0)
    const limit = ref(10)

    const { result: themeResult, refetch: themeRefetch } = useQuery(GET_THEME, { themeId: props.themeId })
    const themeTitle              = useResult(themeResult, null, data => data.theme.title)

    const { result: commentsResult, loading, refetch: commentsRefetch, fetchMore } = useQuery(GET_THEME_COMMENTS, { themeId: props.themeId, skip: skip.value, limit: limit.value })
    console.log("commentsResult", commentsResult)
    const comments = useResult(commentsResult, null, data => data.themeComments.comments)
    const hasMore  = useResult(commentsResult, null, data => data.themeComments.hasMore)

    async function loadMore() {
      try {
        
        loading.value = true
        await fetchMore({
          variables: {
            skip: skip.value += limit.value,
            limit: limit.value
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult
            console.log(previousResult)

            const result = {
              themeComments: {
                __typename: previousResult.themeComments.__typename,
                comments: [
                  ...previousResult.themeComments.comments,
                  ...fetchMoreResult.themeComments.comments
                ],
                hasMore: fetchMoreResult.themeComments.hasMore
              }
            }
            console.log("result vale", result)

            return result
          }
        })
        loading.value = false

      } catch (err) {
        console.log(err)
      }
    }

    watch(() => props.themeId, async () => {
      await themeRefetch({ themeId: props.themeId })
      await commentsRefetch({ themeId: props.themeId })
    })

    return  {
      themeTitle,
      comments,
      loading,
      hasMore,
      loadMore
    }
  }
}
</script>


<style lang="scss" scoped>
.mplus {
  font-family: 'M PLUS Rounded 1c', sans-serif!important;
}
</style>