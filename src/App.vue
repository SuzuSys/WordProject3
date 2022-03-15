<template>
  <authenticator>
    <template v-slot=""> <!-- user signOut -->
      <v-app>
        <v-app-bar app>
          <v-app-bar-nav-icon 
            @click="drawer = true"
          ></v-app-bar-nav-icon>
          <v-app-bar-title>
            Word Project
          </v-app-bar-title>
          <v-btn 
            class="ml-auto"
            @click="goAccount"
            icon
          >
            <v-icon :icon="mdiAccount" />
          </v-btn>
        </v-app-bar>
        <v-navigation-drawer
          v-model="drawer"
          bottom
          temporary
        >
          <v-list           
            nav
            density="compact"
          >
            <v-list-item
              :prepend-icon="mdiViewDashboard"
              title="Dashboard"
              @click="goDashboard"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <router-view></router-view>
        </v-main>
      </v-app>
    </template>
  </authenticator>
</template>
<script>
import '@aws-amplify/ui-vue/styles.css';
import { mdiAccount, mdiViewDashboard } from '@mdi/js';
export default {
  name: 'App',
  data: () => ({
    mdiAccount,
    mdiViewDashboard,
    drawer: false,
  }),
  methods: {
    goDashboard() {
      this.$router.push({ path: './dashboard' });
    },
    goAccount() {
      this.$router.push({ path: '/account' });
    },
  },
};
</script>