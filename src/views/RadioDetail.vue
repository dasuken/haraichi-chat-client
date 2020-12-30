<template>
  <div>
    <comment-create-btn :themes="themes" />

    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8" style="position: relative">
          <v-btn icon small class="mb-3 ml-2" @click="historyBack">
            <v-icon>arrow_back</v-icon>
          </v-btn>

          <!-- Radio Header -->
          <div class="radioHeader">
            <div
              class="font-weight-black text-h6 d-flex justify-space-between align-baseline px-3"
            >
              <div>
                <span class="mplus orange--text" style="font-size: 50px">{{
                  radioTimes
                }}</span>
                回目のターン
              </div>
              <div class="text-subtitle-2 grey--text">
                放送日: {{ radioDate }}
              </div>
            </div>
            <v-divider></v-divider>
            <div class="text-center mt-10 mb-2">
              <v-btn v-if="youtubeWindow" fab dark color="red" @click="toggleYoutube">
                <v-icon>cancel</v-icon>
              </v-btn>
              <v-btn v-if="!youtubeWindow" fab dark color="red" @click="toggleYoutube">
                <v-icon>video_library</v-icon>
              </v-btn>
            </div>

            <div v-if="youtubeWindow" class="px-3">
              <Youtube :youtubeUrl="youtubeUrl"></Youtube>
            </div>
          </div>

          <!-- Theme Cards -->

          <div class="themeCards mt-5">
            <h2 class="mb-2 font-weight-black px-3">今週のコーナー</h2>
            <div style="overflow-y: scroll" class="d-flex">
              <v-col cols="7" md="5" v-for="theme in themes" :key="theme._id">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    elevation="6"
                    class="rounded-lg"
                    @click="changeTheme(theme._id)"
                    :class="{ selectedBorder: isSelected(theme._id) }"
                  >
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="grey lighten-2">
                        <v-btn dark color="black">はがき一覧表示</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                    <v-img :src="theme.thumbnail" aspect-ratio="1.3">
                      <div class="mt-2 ml-2" v-if="isSelected(theme._id)">
                        <v-chip dark color="orange" class="font-weight-black"
                          >選択中</v-chip
                        >
                      </div>
                    </v-img>
                    <div class="text-h6 font-weight-bold pa-3 mplus">
                      {{ theme.title }}
                    </div>

                    <div class="text-caption font-weight-semibold pa-3">
                      <p class="text-subtitle-2 font-weight-bold">
                        コーナー説明
                      </p>
                      {{ theme.description }}
                    </div>
                  </v-card>
                </v-hover>
              </v-col>
            </div>
          </div>

          <h1 class="mt-12 px-3">リスナーの投稿</h1>
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
    const youtubeWindow   = ref(true);

    watch(() => ctx.root.$store.getters['selectedThemeId'], () => {
      console.log("store changed");
      selectedThemeId.value = ctx.root.$store.getters['selectedThemeId']
    })

    // apollo state
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

    const { result: radioThemeResult, onResult } = useQuery(GET_RADIO_THEMES, {
      radioId: props.id,
    });
    onResult((data) => {
      if (props.id === ctx.root.$store.getters['lastVisitedRadio']) return
      const firstThemeId = data.data.radioThemes[0]._id
      ctx.root.$store.commit('setTheme', firstThemeId)
      ctx.root.$store.commit('setLastVisitedRadio', props.id)
      console.log("setTheme動いたよ", ctx.root.$store.getters['selectedThemeId']);
    });
    const themes = useResult(
      radioThemeResult,
      null,
      (data) => data.radioThemes
    );

    // ordinary functions
    function changeTheme(themeId) {
      ctx.root.$store.commit('setTheme', themeId)
    }
    function toggleYoutube() {
      youtubeWindow.value = !youtubeWindow.value;
    }
    function isSelected(themeId) {
      return selectedThemeId.value === themeId;
    }
    function historyBack() {
      ctx.root.$router.go(-1)
    }

    return {
      selectedThemeId,
      youtubeUrl,
      youtubeWindow,

      loading,
      radioTimes,
      radioDate,
      themes,
      changeTheme,

      toggleYoutube,
      isSelected,
      historyBack,
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