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
          <v-menu
            v-model="menu_languages"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                dark
                icon
                v-bind="props"
              >
                <v-icon icon="mdi-web"></v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list>
                <v-list-subheader>Translaion</v-list-subheader>
                <v-list-item
                  v-for="(item, i) in languages"
                  :key="i"
                  :value="item"
                  :color="$i18n.locale === item.value ? 'primary' : 'default'"
                  variant="contained"
                  @click="changeLanguage(item.value)"
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
            <v-icon icon="mdi-account" />
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
              prepend-icon="mdi-view-dashboard"
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
export default {
  name: 'App',
  data: () => ({
    translation: 'ja',
    drawer: false,
    languages: [
      {value: 'ja', label: '日本語'},
      {value: 'en', label: 'English'},
    ],
    menu_languages: false,
  }),
  methods: {
    goDashboard() {
      this.$router.push({ path: './dashboard' });
    },
    goAccount() {
      this.$router.push({ path: '/account' });
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.menu_languages = false;
    },
  },
};
</script>