<template>
  <v-card color="basil" dark tile>
    <v-card-title class="text-center">
      <router-link to="/">
        <h3 class="d-flex align-center">
          <v-avatar color="white" size="40" class="mr-2">
            <!-- <v-icon color="orange darken-2" size="40">
              contactless
            </v-icon> -->
            <v-img src="@/assets/radio.png"></v-img>
          </v-avatar>
          <div class="logo-font yellow--text darken-2">ハライチのターン コーナーメール供養寺</div>
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
    </v-card-title>
  </v-card>
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
  }
</style>