<template>
  <div class="white pb-3" >
      <!-- <v-img aspect-ratio="2" max-height="400px" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/kuro_matsu2023/20171101/20171101164433.jpg"> -->
      <v-container>

        <v-row justify="center">
          <v-col cols="12" lg="10">

            <v-row align="center" justify="center" style="height: 100%;">
              <v-col cols="12" sm="6" class="mb-6">
                <div class="mplus text-h4 mb-7 orange--text">コーナーメールを供養しよう！</div>

                <div class="text-subtitle-2 font-weight-black mb-7">
                  <div>
                    <v-icon color="success" small class="mr-1">done</v-icon>
                    読まれなかったけど面白いはず
                  </div>
                  <div>
                    <v-icon color="success" small class="mr-1">done</v-icon>
                    送るのは面倒だけど試したい
                  </div>
                </div>
                <v-btn color="orange" class="white--text mplus" :to="`/radio/${latestRadioId}`" >
                  <v-icon>keyboard_arrow_right</v-icon>
                  今週のラジオへ
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6" class="d-none d-sm-flex">
                <v-img src="https://www.tokyoheadline.com/wp-content/uploads/haraichi.jpg" aspect-ratio="1.3" class="rounded-xl"></v-img>
              </v-col>
            </v-row>

          </v-col>
        </v-row>

      </v-container>
  </div>
</template>

<script>
  export default {
    props: ['latestRadioId'],
  }
</script>

<style lang="scss" scoped>
.mplus {
  font-family: 'M PLUS Rounded 1c', sans-serif!important;
}
</style>