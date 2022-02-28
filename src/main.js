import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import { loadFonts } from '@/plugins/webfontloader';
import Amplify from "aws-amplify";
import awsExports from "@/aws-exports";
import AmplifyVue from '@aws-amplify/ui-vue';
Amplify.configure(awsExports);

loadFonts();

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(AmplifyVue)
  .mount('#app');
