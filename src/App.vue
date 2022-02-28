<script setup>
import '@aws-amplify/ui-vue/styles.css';
</script>
<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <v-app>
        <v-app-bar app>
          <v-app-bar-title>
            Word Project
          </v-app-bar-title>
          <v-btn 
            class="ml-auto"
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
          {{ user }}
        </v-main>
      </v-app>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>