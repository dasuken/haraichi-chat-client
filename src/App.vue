<template>
  <v-app>
    <SnackBar />
    <Nav class="margin-x"></Nav>
    <transition name="fade" style="style=background-color: #fafafa;">
      <router-view class="margin-x"></router-view>
    </transition>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SnackBar from '@/components/shared/SnackBar'

export default {
  name: 'App',
  components: { Nav, Footer, SnackBar },
  setup: (_, {root}) => {
    function openSnackBar() {
      root.$store.commit('openSnackbar', "Snackbar起動！")
    }
    return { openSnackBar }
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: inherit!important;
}

.margin-x {
  margin-left: 20px!important;margin-right: 20px!important;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.20s;
  transform: translateX(100px);
  opacity: 0;
}

.fade-enter-active {
  transition-delay: 0.20s;
}


.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.w-full {
  width: 100%;
}

.w-half {
  width: 50%;
}

.h-full {
  height: 100%;
}

.opacity-50 {
  opacity: .5;
}

.cursor-pointer {
  cursor: pointer;
}

</style>
