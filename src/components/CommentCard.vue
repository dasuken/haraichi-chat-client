<template>
  <div>
    <div class="ml-3">
      <span class="grey--text text-caption mr-2">ラジオネーム: </span>
      <span class="text-h6 font-weight-bold">{{ comment.radioName }}</span>
    </div>
    <v-card flat>
      <v-card-title class="font-weight-semibold andika text-subtitle-2" style="white-space: pre-wrap;">{{
        comment.message
      }}</v-card-title>
      <div class="d-flex align-center justify-space-between">
        <div class="ml-3 text-caption grey--text">
          {{ comment.createdAt }}
        </div>
        <div class="d-flex align-center">
          <v-btn
            small
            icon
            class="mr-2 mb-2"
            @click="toggleLikeComment(comment._id)"
          >
            <v-icon :class="checkIfCommentLiked(comment._id) ? 'orange--text' : 'grey--text' ">thumb_up_alt</v-icon>
          </v-btn>
          <span class="mb-1 mr-5">{{ comment.likes }}</span>
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
