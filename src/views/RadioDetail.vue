<template>
  <div style="background-color: #fafafa;" class="pt-12">
    <comment-create-btn :themes="themes" />

    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" style="position: relative">

          <!-- Radio Header -->
          <div class="radioHeader mb-5">
            <div class="text-caption grey--text">
              放送日: {{ radioDate }}
            </div>
            <div class="font-weight-black text-h4">
              <div class="mplus">{{ radioTimes }}回目のターン</div>
            </div>
          </div>

          <div class="px-2">
            <v-row>
              <v-col cols="12" class="mx-n3">
                <Youtube :youtubeUrl="youtubeUrl"></Youtube>
              </v-col>
            </v-row>
          </div>

          <!-- Theme Cards -->

          <div class="themeCards mt-5">
            <div class="mb-2 font-weight-black">今週のコーナー</div>
            <div class="d-flex flex-wrap mx-n3">
              <v-col cols="12" md="6" v-for="theme in themes" :key="theme._id">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    elevation="6"
                    class="rounded-lg pa-2"
                    @click="changeTheme(theme._id)"
                    :class="{ selectedBorder: isSelected(theme._id) }"
                  >
                    <div class="mt-1 ml-1" v-if="isSelected(theme._id)">
                      <v-chip dark color="orange" class="font-weight-black"
                        >選択中</v-chip
                      >
                    </div>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="grey lighten-2">
                        <v-btn dark color="black">はがき一覧表示</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                    <v-row align="center">
                      <v-col cols="5" md="12">
                        <v-img :src="theme.thumbnail" aspect-ratio="1.3"></v-img>
                      </v-col>

                      <v-col cols="7" md="12">
                        <div class="text-subtitle-1 font-weight-bold mplus">
                          {{ theme.title }}
                        </div>
                        <v-divider class="mb-2"></v-divider>
                        <div class="text-caption font-weight-bold">
                          {{ theme.description }}
                        </div>
                      </v-col>
                   </v-row>

                  </v-card>
                </v-hover>
              </v-col>
            </div>
          </div>

          <h3 class="mt-12 d-flex align-center justify-space-between">
            <div class="font-weight-black">
              リスナーの投稿
            </div>
          </h3>
          <comments :selectedThemeId="selectedThemeId" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_RADIO, GET_RADIO_THEMES } from "@/queries.js";
import { useQuery, useResult } from "@vue/apollo-composable";
import { ref, watch } from "@vue/composition-api";

// components
import Youtube     from "@/components/shared/Youtube";
import Comments    from "@/components/Comments.vue";
import CommentCreateBtn from "@/components/CommentCreateBtn"

export default {
  props: ["id"],
  components: {
    Youtube,
    Comments,
    CommentCreateBtn,
  },
  setup(props, ctx) {
    // ordinary data
    const selectedThemeId = ref(ctx.root.$store.getters['selectedThemeId']);

    watch(() => ctx.root.$store.getters['selectedThemeId'], () => {
      selectedThemeId.value = ctx.root.$store.getters['selectedThemeId']
    })

    // apollo state
    // radio
    const { result: radioResult, loading } = useQuery(GET_RADIO, {
      radioId: props.id,
    });
    const radioTimes = useResult(radioResult, null, (data) => data.radio.times);
    const radioDate  = useResult(
      radioResult,
      null,
      (data) => data.radio.broadCastingDate || data.radio.createdAt
    );
    const youtubeUrl = useResult(radioResult, null, (data) => data.radio.youtubeUrl);

    // themes
    const { result: radioThemeResult, onResult } = useQuery(GET_RADIO_THEMES, {
      radioId: props.id,
    });
    onResult((data) => {
      if (props.id === ctx.root.$store.getters['lastVisitedRadio']) return
      const firstThemeId = data.data.radioThemes[0]._id
      ctx.root.$store.commit('setTheme', firstThemeId)
      ctx.root.$store.commit('setLastVisitedRadio', props.id)
    });
    const themes = useResult(radioThemeResult, null, data => data.radioThemes);

    // ordinary functions
    function changeTheme(themeId) {
      ctx.root.$store.commit('setTheme', themeId)
    }
    function isSelected(themeId) {
      return selectedThemeId.value === themeId;
    }

    return {
      selectedThemeId,
      youtubeUrl,

      loading,
      radioTimes,
      radioDate,
      themes,
      changeTheme,

      isSelected,
    };
  },
};
</script>

<style lang="scss" scoped>
.mplus {
  font-family: "M PLUS Rounded 1c", sans-serif !important;
}

.selectedBorder {
  border: 3px solid orange !important;
}
</style>