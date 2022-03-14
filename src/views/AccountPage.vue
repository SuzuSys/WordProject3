<template>
  <div>
    <v-alert
      density="compact"
      type="error"
      v-show="alert_cannot_get_user_info"
    >
      {{ $t("AccountPage.error.NotGetUserInfo") }}
    </v-alert>
    <edit-account
      v-if="create_edit_account"
      :initial_username="initial.username"
      :initial_email="initial.email" 
    />
    <v-card
      elevation="2"
      class="mx-auto"
      max-width="374"
    >
      <v-card-title>Edit Profile</v-card-title>
      <!--
      <v-card-actions>
        <v-form>
          <v-text-field
            label="Name"
            v-model="name"
          ></v-text-field>
          <v-btn
            @click="editName"
          >
            Edit
          </v-btn>
        </v-form>
      </v-card-actions>
      -->
    </v-card>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import EditAccount from '@/components/EditAccount';

export default {
  name: 'AccountPage',
  components: {
    EditAccount,
  },
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      initial: {
        username: '',
        email: '',
      },
      create_edit_account: false,
      alert_cannot_get_user_info: false,
    };
  },
  methods: {
    async getUserInfo() {
      try {
        let user = await Auth.currentAuthenticatedUser();
        this.initial = {
          username: user.username,
          email: user.attributes.email,
        }
        this.alert_cannot_get_user_info = false;
      } catch {
        this.alert_cannot_get_user_info = true;
      }
      this.create_edit_account = true;
    },
  },
};
</script>
