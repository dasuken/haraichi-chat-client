<template>
  <div class="mt-10">
    <TopPageCarousel :latestRadioId="latestRadioId" />
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-row justify="space-between">
            <v-col cols="12" md="8" class="mb-10" radio style="position: relative;">
              <div v-if="loading" class="d-flex align-center justify-center" style="position: absolute; z-index: 100; width: 100%; margin-top: 30px;">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="orange"
                  indeterminate
                ></v-progress-circular>
              </div>

              <!-- 普通のラジオ一覧 -->
              <h1 class="text-center">
                <v-chip label dark color="orange" outlined class="mb-2">ラジオ一覧</v-chip>
              </h1>
              <v-row>
                <v-col cols="12" sm="6" v-for="radio in radios" :key=radio._id>
                  <RadioCard :radio="radio" :latestRadioId="radios[0]._id" />
                </v-col>
              </v-row>
            </v-col>

            <!-- 新規コメントエリア -->
            <v-col cols="3" offset="1"  class="hidden-sm-and-down">
              <recent-comments />
            </v-col>

          </v-row>

        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import { GET_RADIOS } from '@/queries.js'
import { useQuery, useResult } from '@vue/apollo-composable'

import TopPageCarousel from "@/components/TopPageCarousel"
import RecentComments  from "@/components/RecentComments"
import RadioCard       from "@/components/RadioCard"

export default {
  name: 'Home',
  components: {
    RecentComments,
    TopPageCarousel,
    RadioCard,
  },
  setup() {
    const { result, loading } = useQuery(GET_RADIOS)
    const radios = useResult(result, null, data => data.radios)
    const latestRadioId = useResult(result, null, data => data.radios[0]._id)
    return {
      radios,
      loading,
      latestRadioId
    }
  },
}
</script>
