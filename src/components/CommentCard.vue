<template>
  <div>
    <v-card flat style="border-top: 1px solid #e2e8f0" tile class="px-6 py-4">
      <div class="d-flex justify-space-between">
        <div>
          <span class="grey--text text-caption mr-2">RN:</span>
          <span class="text-overline font-weight-black">
            {{ comment.radioName }}
          </span>
          <v-icon color="orange" v-if="checkIfCommentUser">account_circle</v-icon>
        </div>
        <div class="text-caption grey--text">
          {{ comment.createdAt | formatDateTime }}
        </div>
      </div>
      <div
        class="font-weight-bold andika text-subtitle-2 mt-4 mb-2"
        style="white-space: pre-wrap"
      >
        {{ comment.message }}
      </div>
      <div class="d-flex align-center justify-space-between mt-4">
        <div>
          <div class="d-flex align-center">
            <!-- コメントボタン -->
            <response-create-btn :commentId="comment._id" />

            <!-- toggle response area -->
            <template v-if="responseCounts">
              <v-btn
                small
                tile
                color="white blue--text"
                class="mr-2 ml-n4"
                elevation="0"
                @click="expandComment = !expandComment"
              >
                <template v-if="!expandComment">
                  <v-icon>keyboard_arrow_down</v-icon>
                  返信: {{ responseCounts }}件
                </template>
                <template v-else>
                  <v-icon>keyboard_arrow_up</v-icon>
                  返信を閉じる
                </template>
              </v-btn>
            </template>

            <!-- edit delete buttons -->
            <span v-if="checkIfCommentUser">
                <comment-edit-btn :comment="comment" />
                <comment-delete-btn
                  :comment="comment"
                  :selectedThemeId="selectedThemeId"
                />
            </span>
          </div>
        </div>

        <div class="d-flex align-center">
          <v-btn
            x-small
            fab
            dark
            class="mr-2"
            :class="checkIfCommentLiked(comment._id) ? 'orange' : 'grey'"
            @click="toggleLikeComment(comment._id)"
          >
            <v-icon>thumb_up_alt</v-icon>
          </v-btn>
          <span>{{ comment.likes }}</span>
        </div>
      </div>

      <response-list v-if="expandComment" :commentId="comment._id" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  GET_COMMENT_RESPONSE_COUNTS,
} from "@/queries.js";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import { computed, ref } from "@vue/composition-api";

// components
import CommentEditBtn from "@/components/CommentEditBtn.vue";
import CommentDeleteBtn from "./CommentDeleteBtn.vue";
import ResponseList from "./ResponseList.vue";
import ResponseCreateBtn from "./ResponseCreateBtn.vue";

export default {
  props: {
    comment: Object,
    selectedThemeId: String,
  },
  components: {
    CommentEditBtn,
    CommentDeleteBtn,
    ResponseList,
    ResponseCreateBtn,
  },
  computed: {
    ...mapGetters(["likedCommentIds"]),
  },
  setup(props, { root }) {
    const expandComment = ref(false);

    // apollo state
    const { result } = useQuery(GET_COMMENT_RESPONSE_COUNTS, {
      commentId: props.comment._id,
    });
    const responseCounts = useResult(
      result,
      null,
      (data) => data.commentResponseCounts
    );

    // apollo mutation
    const { mutate: unlikeComment } = useMutation(UNLIKE_COMMENT, {
      variables: { commentId: props.comment._id },
    });
    const { mutate: likeComment } = useMutation(LIKE_COMMENT, {
      variables: { commentId: props.comment._id },
    });

    // ordinary
    function toggleLikeComment(commentId) {
      try {
        if (this.likedCommentIds.includes(commentId)) {
          this.$store.commit("unlikeComment", commentId);
          unlikeComment();
        } else {
          this.$store.commit("likeComment", commentId);
          likeComment();
        }
      } catch (error) {
        console.log(error);
      }
    }
    function checkIfCommentLiked(commentId) {
      return this.likedCommentIds && this.likedCommentIds.includes(commentId);
    }
    const checkIfCommentUser = computed(
      () => root.$store.getters["userId"] === props.comment.userId
    );

    return {
      expandComment,
      responseCounts,
      toggleLikeComment,
      checkIfCommentLiked,
      checkIfCommentUser,
    };
  },
};
</script>
