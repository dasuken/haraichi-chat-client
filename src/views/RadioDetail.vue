<template>
  <div>
    <SnackBar
      :snackbar="snackbar"
      text="投稿しました！"
      @close-snack-bar="snackbar = false"
    />
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          large
          color="orange darken-2 pa-2"
          v-on="on"
          style="position: fixed; right: 100px; bottom: 100px; z-index: 1"
          fab
        >
          <v-icon dark>edit</v-icon>
        </v-btn>
      </template>

      <CommentForm
        :themes="themes"
        @closeModal="closeModal"
        @showSnackbar="showSnackbar"
      />
    </v-dialog>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8" style="position: relative">
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
            <div class="text-center mt-10">
              <v-btn dark color="red" large @click="toggleYoutube"
                >YOUTUBE再生</v-btn
              >
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
          <!-- theme selector -->
          <!-- <div class="d-flex">

              <div style="width: 200px;" class="mt-7 ml-6">
                <v-select
                  prepend-inner-icon="swap_vert"
                  :items="themes"
                  item-text="title"
                  item-value="_id"
                  v-model="selectedThemeId"
                  label="コーナー選択"
                  filled
                ></v-select>

              </div>
          </div> -->

          <h1 class="mt-12 px-3">リスナーの投稿</h1>
          <comments :themeId="selectedThemeId" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_RADIO, GET_RADIO_THEMES } from "@/queries.js";

import { useQuery, useResult } from "@vue/apollo-composable";
import { ref } from "@vue/composition-api";

import Youtube from "@/components/shared/Youtube";
import SnackBar from "@/components/shared/SnackBar";
import CommentForm from "@/components/CommentForm";
import Comments from "@/components/Comments.vue";

export default {
  props: ["id"],
  components: {
    Youtube,
    CommentForm,
    SnackBar,
    Comments,
  },
  setup(props) {
    // ordinary data
    const dialog          = ref(false);
    const selectedThemeId = ref(null);
    const snackbar        = ref(false);
    const youtubeWindow   = ref(false);

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
      selectedThemeId.value = data.data.radioThemes[0]._id;
    });
    const themes = useResult(
      radioThemeResult,
      null,
      (data) => data.radioThemes
    );

    // ordinary functions
    function changeTheme(themeId) {
      selectedThemeId.value = themeId;
    }
    function closeModal() {
      dialog.value = false;
    }
    function showSnackbar() {
      snackbar.value = true;
      setTimeout(() => {
        snackbar.value = false;
      }, 3000);
    }
    function toggleYoutube() {
      youtubeWindow.value = !youtubeWindow.value;
    }
    function isSelected(themeId) {
      return selectedThemeId.value === themeId;
    }

    return {
      dialog,
      selectedThemeId,
      snackbar,
      youtubeUrl,
      youtubeWindow,

      loading,
      radioTimes,
      radioDate,
      themes,
      changeTheme,

      showSnackbar,
      closeModal,
      toggleYoutube,
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