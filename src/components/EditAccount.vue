<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <v-card-title>Edit Account</v-card-title>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="9 px-1">
            <v-text-field
              v-model="username"
              label="Username"
              variant="outlined"
              readonly
              :hint="this.$t('AccountPage.info.CannotChangeUsername')"
              density="compact"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-form>
          <v-row>
            <v-col cols="9" class="px-1">
              <v-text-field
                v-model="email"
                label="Email"
                density="compact"
                variant="outlined"
                clearable
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="px-1 d-flex justify-center align-center">
              <v-btn
                @click="updateEmail"
                :disabled="loading_update_email"
                variant="outlined"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>  
        </v-form>
        <v-alert 
          type="info"
          v-show="alert_sendback_email_verification_code"
          density="compact"
          class="mx-n2 my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.info.SendEmailVerificationCode") }}
        </v-alert>
        <v-form
          v-show="form_email_verification_code"
        >
          <v-row>
            <v-col cols="9" class="px-1">
              <v-text-field
                v-model="email_verification_code"
                label="Verification Code"
                density="compact"
                variant="outlined"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="px-1 d-flex justify-center align-center">
              <v-btn
                @click="sendbackEmailVerificationCode"
                :disabled="loading_sendback_email_verification_code"
                variant="outlined"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-alert 
          type="error"
          v-show="alert_code_mismatch"
          density="compact"
          class="mx-n2 my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.error.EmailVerificationCodeMismatch") }}
        </v-alert>
        <v-alert 
          type="success"
          v-show="alert_email_success"
          density="compact"
          class="mx-n2 my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.success.UpdateEmail") }}
        </v-alert>
        <v-alert
          type="error"
          v-show="alert_email_error"
          density="compact"
          class="mx-n2 my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.error.UpdateEmail") }}
        </v-alert>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { API, Auth } from 'aws-amplify';
import { access_email_verification } from '@/graphql/queries';

export default {
  name: 'EditAccount',
  props: {
    initial_username: String,
    initial_email: String,
  },
  data() {
    return {
      username: this.initial_username,
      email: this.initial_email,
      email_original: this.initial_email,
      email_verification_code: '',

      loading_update_email: false,
      loading_sendback_email_verification_code: false,

      alert_sendback_email_verification_code: false,
      alert_email_success: false,
      alert_email_error: false,
      alert_code_mismatch: false,

      form_email_verification_code: false,
    }
  },
  created() {
    this.getEmailVerification();
  },
  methods: {
    async updateEmail() {
      this.loading_update_email = true;

      this.alert_email_success = false;
      this.alert_email_error = false;
      this.alert_sendback_email_verification_code = false;
      this.alert_code_mismatch = false;
      this.form_email_verification_code = false;
      try {
        const user = await Auth.currentAuthenticatedUser();
        const result = await Auth.updateUserAttributes(user, {
          email: this.email,
        });
        if (result === 'SUCCESS') {
          this.alert_sendback_email_verification_code = true;
          this.form_email_verification_code = true;
        }
        else {
          throw new Error();
        }
      } catch {
        this.alert_email_error = true;
      } finally {
        this.loading_update_email = false;
      }
    },
    async getEmailVerification() {
      try {
        const response = await API.graphql({
          query: access_email_verification,
        });
        console.log(response.data.access_email_verification);
      } catch {
        console.log('error');
      }
    },
    async sendbackEmailVerificationCode() {
      this.loading_sendback_email_verification_code = true;

      this.alert_email_success = false;
      this.alert_email_error = false;
      this.alert_code_mismatch = false;
      try {
        const response = await Auth.verifyCurrentUserAttributeSubmit(
          'email', this.email_verification_code);
        if (response === 'SUCCESS') {
          this.alert_email_success = true;
          this.form_email_verification_code = false;
          this.alert_sendback_email_verification_code = false;
        }
      } catch (e) {
        if (e.name === 'CodeMismatchException') {
          this.alert_code_mismatch = true;
        } else {
          this.alert_email_error = true;
        }
      } finally {
        this.loading_sendback_email_verification_code = false;
      }
    },
  },
};
</script>
