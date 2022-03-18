<template>
  <div>
    <!-- Cannot get user info -->
    <v-alert
      density="compact"
      type="error"
      v-show="alert_cannot_get_user_info"
    >
      {{ $t("AccountPage.error.NotGetUserInfo") }}
    </v-alert>
    <edit-account
      v-if="create_edit_account"
      :initial_email="initial.email"
      :email_not_verified_yet="initial.email_not_verified_yet"
    ></edit-account>
    <edit-profile
      v-if="create_edit_profile"
      :initial_name="initial.name"
      :initial_language="initial.language"
    ></edit-profile>
    <!-- Sign Out -->
    <v-card
      class="mx-auto my-12"
      max-width="500"
      variant="outlined"
    >
      <v-card-title>Sign Out</v-card-title>
      <v-card-actions>
        <v-container class="pa-1">
          <v-btn
            @click="signOut"
            variant="outlined"
            block
            class="my-2 mx-0"
            :disabled="disable_signout_btn"
          >
            Sign Out
          </v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import EditAccount from '@/components/EditAccount';
import EditProfile from '@/components/EditProfile';

export default {
  name: 'AccountPage',
  components: {
    EditAccount,
    EditProfile,
  },
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      initial: {
        email: '',
        email_not_verified_yet: false,
        name: '',
        language: '',
      },
      create_edit_account: false,
      create_edit_profile: false,
      alert_cannot_get_user_info: false,
      disable_signout_btn: false,
    };
  },
  methods: {
    async getUserInfo() {
      try {
        let user = await Auth.currentAuthenticatedUser();
        console.log(user);
        this.initial = {
          email: user.attributes.email,
          email_not_verified_yet: !user.attributes.email_verified,
          name: user.attributes.name || '',
          language: user.attributes['custom:language'] || '',
        };
        this.create_edit_account = true;
        this.create_edit_profile = true;
      } catch {
        this.alert_cannot_get_user_info = true;
      }
    },
    async signOut() {
      this.disable_signout_btn = true;
      await Auth.signOut();
    },
  },
};
</script>
