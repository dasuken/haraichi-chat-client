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
    </v-card-title>
  </v-card>
</template>

<style lang="scss" scoped>
  .logo-font {
    font-family: Corporate-Logo-Rounded!important;
  }
</style>