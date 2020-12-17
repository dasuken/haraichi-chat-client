<template>
  <v-card color="basil" dark tile>
    <v-card-title class="text-center justify-center">
      <router-link to="/">
        <h1 class="d-flex align-center">
          <v-avatar color="white" size="40" class="mr-2">
            <v-icon color="orange darken-2" size="50">
              contactless
            </v-icon>
          </v-avatar>
          <div class="logo-font yellow--text darken-2">ハライチのはがき置き場</div>
        </h1>
      </router-link>
    </v-card-title>
  </v-card>
</template>

<style lang="scss" scoped>
  .logo-font {
    font-family: Corporate-Logo-Rounded!important;
  }
</style>