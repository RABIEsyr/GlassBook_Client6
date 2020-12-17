import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import VueWindowSize from "vue-window-size";
import i18n from './i18n'
import CountryFlag from 'vue-country-flag'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueWindowSize);
Vue.use(CountryFlag);

Vue.filter('date', function (value) {
  let a = new Date(value);
  console.log('')
  let c = new Date();
  if (a.getTime() == c.getTime()) {
    return 'today'
  }
  else {
    return value;
  }
})

export const eventBus = new Vue({

  methods: {
    passPhoto(photo) {
      this.$emit("photoChanged", photo);
    },
    openPostDialog() {
      this.$emit("openPostDialog", true);
    },
    shareImageSearchUser(image) {
      this.$emit("searchUserImage", image);
    },
  }
});
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
