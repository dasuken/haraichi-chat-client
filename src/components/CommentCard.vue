<template>
  <div>
    <v-card flat style="border-top: 1px solid #e2e8f0;" tile class="px-6 py-4">
      <div class="d-flex justify-space-between">
        <div>
          <span class="grey--text text-caption mr-2">RN: </span>
          <v-chip dark small class="text-subtitle-2 font-weight-semibold">{{ comment.radioName }}</v-chip>
        </div>
        <div class="text-caption grey--text">
          {{ comment.createdAt | formatDateTime }}
        </div>
      </div>
      <div class="font-weight-black andika text-subtitle-1 mt-4 mb-2" style="white-space: pre-wrap;">{{
        comment.message
      }}</div>
      <div class="d-flex align-center justify-end">
        
        <div class="d-flex align-center">
          <v-btn
            small
            icon
            class="mr-2"
            @click="toggleLikeComment(comment._id)"
          >
            <v-icon :class="checkIfCommentLiked(comment._id) ? 'orange--text' : 'grey--text' ">thumb_up_alt</v-icon>
          </v-btn>
          <span>{{ comment.likes }}</span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LIKE_COMMENT, UNLIKE_COMMENT } from "@/queries.js"
import { useMutation } from '@vue/apollo-composable'

  export default {
    props: {
      comment: Object
    },
    computed: {
      ...mapGetters(["likedCommentIds"]),
    },
    setup(props) {
      const { mutate: unlikeComment } = useMutation(UNLIKE_COMMENT, { variables: { commentId: props.comment._id } })
      const { mutate: likeComment }   = useMutation(LIKE_COMMENT, { variables: { commentId: props.comment._id } })

      function toggleLikeComment(commentId) {
        try {
          if (this.likedCommentIds.includes(commentId)) {
            this.$store.commit("unlikeComment", commentId);
            unlikeComment()
          } else {
            this.$store.commit("likeComment", commentId);
            likeComment()
          }
        } catch (error) {
          console.log(error);
        }
      }

      function checkIfCommentLiked(commentId) {
        return this.likedCommentIds && this.likedCommentIds.includes(commentId)
      }

      return { toggleLikeComment, checkIfCommentLiked }
    },
  }
</script>
