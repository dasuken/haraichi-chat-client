<template>
  <div>
    <v-card tile>
      <v-img aspect-ratio="2" max-height="400px" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/kuro_matsu2023/20171101/20171101164433.jpg">
        <v-row align="center" style="height: 100%;">
          <v-col cols="1"></v-col>
          <v-col cols="11">
            <div class="white--text mplus text-h4 mb-10">コーナーメールを投稿しよう！</div>
            <div class="white--text text-h6 font-weight-black mb-3">
              ハライチチャットとは？
            </div>
            <div class="white--text text-subtitle-2 font-weight-black">
              <div>
                <v-chip color="orange" class="white--text mb-1">
                  <v-icon color="success" small class="mr-1">done</v-icon>
                  読まれなかったけど面白いはず
                </v-chip>
              </div>
              <div>
                <v-chip color="orange" class="white--text">
                  <v-icon color="success" small class="mr-1">done</v-icon>
                  送るのは億劫だけど試したい
                </v-chip>
              </div>
            </div>
            <div class="white--text font-weight-black text-subtitle-2 mt-5">そんなメールを共有するハライチのターンまとめサイトです。</div>
            <v-btn color="black" small class="white--text mplus" :to="`/radio/${latestRadioId}`" >
              今週のラジオへ
            </v-btn>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: ['latestRadioId']
  }
</script>

<style lang="scss" scoped>
.mplus {
  font-family: 'M PLUS Rounded 1c', sans-serif!important;
}
</style>