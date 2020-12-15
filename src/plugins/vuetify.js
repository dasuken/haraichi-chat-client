import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#F57C00',
        // success: '#00BFA5',
        danger: '#E53935',
        info: '#E040FB'
      }
    }
  }
});
