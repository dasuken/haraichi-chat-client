import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify';
import VueYoutube from 'vue-youtube'
import VueCompositionApi, { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable'

Vue.use(VueCompositionApi);
Vue.use(VueYoutube)

Vue.filter('formatDate', (value) => {
  if (!value) return
  return value.split('T')[0]
})

Vue.filter('formatErrorMessage', (value) => {
  if (!value) return
  return value.replace('GraphQL error:', '')
})

Vue.config.productionTip = false

const apolloProvider = createProvider();

new Vue({
  setup() {
    provide(DefaultApolloClient, apolloProvider.defaultClient)
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
