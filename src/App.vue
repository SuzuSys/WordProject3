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
          <v-spacer></v-spacer>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                dark
                icon
                v-bind="props"
              >
                <v-icon :icon="mdiWeb"></v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list>
                <v-list-subheader>Translaion</v-list-subheader>
                <v-list-item
                  v-for="(item, i) in languages"
                  :key="i"
                  :value="item"
                  active-color="primary"
                  variant="contained"
                  @click="$i18n.locale = item.value"
                >
                  <v-list-item-title v-text="item.label"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          <v-btn
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
import { mdiAccount, mdiViewDashboard, mdiWeb } from '@mdi/js';
export default {
  name: 'App',
  data: () => ({
    mdiAccount,
    mdiViewDashboard,
    mdiWeb,

    translation: 'ja',
    drawer: false,
    selectedItem: 0,
    languages: [
      {value: 'ja', label: '日本語'},
      {value: 'en', label: 'English'},
    ],
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