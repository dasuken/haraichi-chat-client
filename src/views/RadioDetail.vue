<template>
  <div style="background-color: #fafafa;" class="pt-12">
    <comment-create-btn :themes="themes" />

    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" style="position: relative">

          <!-- Radio Header -->
          <div class="radioHeader ml-2 mb-5">
            <div class="text-caption grey--text">
              放送日: {{ radioDate }}
            </div>
            <div class="font-weight-black text-h4">
              <div class="mplus">{{ radioTimes }}回目のターン</div>
            </div>
          </div>

          <div class="px-2">
            <v-row>
              <v-col cols="12">
                <Youtube :youtubeUrl="youtubeUrl"></Youtube>
              </v-col>
            </v-row>
          </div>
          

          <!-- Theme Cards -->

          <div class="themeCards mt-5">
            <h2 class="mb-2 font-weight-black px-3">今週のコーナー</h2>
            <div style="overflow-y: scroll" class="d-flex">
              <v-col cols="6" v-for="theme in themes" :key="theme._id">
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
                    <v-img :src="theme.thumbnail" aspect-ratio="1.5">
                      <div class="mt-2 ml-2" v-if="isSelected(theme._id)">
                        <v-chip dark color="orange" class="font-weight-black"
                          >選択中</v-chip
                        >
                      </div>
                    </v-img>
                    <div class="text-h6 font-weight-bold pa-3 mplus">
                      {{ theme.title }}
                    </div>

                    <div class="text-caption font-weight-bold pa-3">
                      <p class="text-subtitle-2 font-weight-black">
                        コーナー説明
                        <v-divider></v-divider>
                      </p>

                      {{ theme.description }}
                    </div>
                  </v-card>
                </v-hover>
              </v-col>
            </div>
          </div>

          <h3 class="mt-12 px-3 font-weight-black">リスナーの投稿</h3>
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
      console.log("store changed");
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