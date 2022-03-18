<template>
  <v-card
    class="mx-auto my-12"
    max-width="500"
    variant="outlined"
  >
    <v-card-title>Edit Profile</v-card-title>
    <v-card-actions>
      <v-container class="pa-1">
        <!-- Name -->
        <v-form>
          <v-row>
            <v-col cols="9">
              <v-text-field
                v-model="name"
                label="Name"
                density="compact"
                variant="outlined"
                clearable
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pl-0 d-flex justify-center align-center">
              <v-btn
                @click="changeName"
                :disabled="loading_change_name"
                variant="outlined"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>  
        </v-form>
        <!-- Name updated -->
        <v-alert 
          type="success"
          v-show="alert_name_success"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.success.UpdateName") }}
        </v-alert>
        <!-- An error occurred while updating the name. -->
        <v-alert 
          type="error"
          v-show="alert_name_error"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.error.UpdateName") }}
        </v-alert>
        <!-- Language -->
        <v-form>
          <v-row>
            <v-col cols="9">
              <v-select
                v-model="selected_language"
                :items="languages"
                label="Language"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="3" class="pl-0 d-flex justify-center align-center">
              <v-btn
                @click="changeLanguage"
                variant="outlined"
                :disabled="loading_change_language || (selected_language === language_original)"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>  
        </v-form>
        <!-- Language updated -->
        <v-alert 
          type="success"
          v-show="alert_language_success"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.success.UpdateLanguage") }}
        </v-alert>
        <!-- An error occurred while updating the language. -->
        <v-alert 
          type="error"
          v-show="alert_language_error"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.error.UpdateLanguage") }}
        </v-alert>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'EditProfile',
  props: {
    initial_name: String,
    initial_language: String,
  },
  data() {
    return {
      name: this.initial_name,
      selected_language: this.initial_language,
      language_original: this.initial_language,
      languages: [
        {value: 'ja', title: '日本語'},
        {value: 'en', title: 'English'},
      ],

      loading_change_name: false,
      loading_change_language: false,

      alert_name_success: false,
      alert_name_error: false,
      alert_language_success: false,
      alert_language_error: false,
    };
  },
  methods: {
    async changeName() {
      this.loading_change_name = true;

      this.alert_name_success = false;
      this.alert_name_error = false;
      try {
        const user = await Auth.currentAuthenticatedUser();
        const result = await Auth.updateUserAttributes(user, {
          name: this.name,
        });
        if (result === 'SUCCESS') {
          this.alert_name_success = true;
        } else {
          throw result;
        }
      } catch (e) {
        console.error(e);
        this.alert_name_error = true;
      } finally {
        this.loading_change_name = false;
      }
    },
    async changeLanguage() {
      this.loading_change_language = true;

      this.alert_language_success = false;
      this.alert_language_error = false;
      try {
        const user = await Auth.currentAuthenticatedUser();
        const result = await Auth.updateUserAttributes(user, {
          'custom:language': this.selected_language,
        });
        if (result === 'SUCCESS') {
          this.alert_language_success = true;
          this.$i18n.locale = this.language_original = this.selected_language;
        } else {
          throw result;
        }
      } catch (e) {
        console.error(e);
        this.alert_language_error = true;
      } finally {
        this.loading_change_language = false;
      }
    },
  },
};
</script>
