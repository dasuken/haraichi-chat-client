<template>
  <div style="position:fixed; width: 100%; z-index: 100;">
    <v-container style="padding-top: 0px!important; padding-bottom: 0px!important;">
      <v-row justify="center">
        <v-col cols="12" lg="10" class="d-flex justify-space-between">

        <router-link to="/">
          <h3 class="d-flex align-center">
            <v-avatar color="white" size="40" class="mr-2">
              <!-- <v-icon color="orange darken-2" size="40">
                contactless
              </v-icon> -->
              <v-img src="@/assets/radio.png"></v-img>
            </v-avatar>
            <!-- <div class="logo-font orange--text darken-2">KUYOU</div> -->
          </h3>
        </router-link>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn outlined small class="font-weight-bold" v-on="on">ヘルプ</v-btn>
          </template>

          <!-- content -->
          <v-card class="pa-6">
            <v-card-title class="font-weight-black mb-5 text-center">
              <h3>何かお困りですか？</h3>
            </v-card-title>
            <v-card-text class="font-weight-semibold">
              お手数ですが、バグや機能要望、感想等御座いましたら<span class="indigo--text">devlopper60@gmail.com</span>までお願い致します。
            </v-card-text>
          </v-card>
        </v-dialog>
      
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  setup() {
    const dialog = ref(false)
    return { dialog }
  }
}
</script>

<style lang="scss" scoped>
  .logo-font {
    font-family: Corporate-Logo-Rounded!important;
    font-weight: 700;
  }
</style>