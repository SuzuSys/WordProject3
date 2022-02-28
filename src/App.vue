<template>
  <authenticator>
    <template v-slot="{ signOut }"> <!-- user.username -->
      <v-app>
        <v-app-bar app>
          <v-app-bar-title>
            Word Project
          </v-app-bar-title>
          <v-btn 
            class="ml-auto"
            @click="goAccount"
          >
            Account
          </v-btn>
          <v-btn 
            @click="signOut"
          >
            SignOut
          </v-btn>
        </v-app-bar>
        <v-main>
          <router-view />
        </v-main>
      </v-app>
    </template>
  </authenticator>
</template>
<script>
import '@aws-amplify/ui-vue/styles.css';
export default {
  name: 'App',
  methods: {
    goAccount() {
      this.$router.push({ path: '/account' });
    }
  },
};
</script>