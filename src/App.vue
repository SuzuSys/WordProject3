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
          absolute
          temporary
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="text--accent-4"
            >
              <v-list-item>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <router-view />
        </v-main>
      </v-app>
    </template>
  </authenticator>
</template>
<script>
import '@aws-amplify/ui-vue/styles.css';
import { mdiAccount } from '@mdi/js';
export default {
  name: 'App',
  data: () => ({
    mdiAccount,
    drawer: false,
    group: null,
  }),
  methods: {
    goAccount() {
      this.$router.push({ path: '/account' });
    }
  },
};
</script>