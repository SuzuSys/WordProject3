<template>
  <v-card
    class="mx-auto my-12"
    max-width="500"
    variant="outlined"
  >
    <v-card-title>Edit Account</v-card-title>
    <v-card-actions>
      <v-container class="pa-1">
        <!-- email -->
        <v-form>
          <v-row>
            <v-col cols="9">
              <v-text-field
                v-model="email"
                label="Email"
                density="compact"
                variant="outlined"
                clearable
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pl-0 d-flex justify-center align-center">
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
        <!-- we sent email varification code -->
        <v-alert 
          type="info"
          v-show="alert_sendback_email_verification_code"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.info.SentEmailVerificationCode") }}
        </v-alert>
        <!-- email has not been verified yet -->
        <v-alert 
          type="info"
          v-show="alert_email_not_verified_yet"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.info.EmailNotVerifiedYet") }}
        </v-alert>
        <!-- email varification code -->
        <v-form
          v-show="form_email_verification_code"
        >
          <v-row>
            <v-col cols="9">
              <v-text-field
                v-model="email_verification_code"
                label="Verification Code"
                density="compact"
                variant="outlined"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pl-0 d-flex justify-center align-center">
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
        <!-- request resend varification code -->
        <v-btn
          @click="requestResendVerificationCode"
          variant="outlined"
          block
          size="small"
          class="my-2 mx-0"
          v-show="form_email_verification_code"
          :disabled="loading_resent_code"
        >
          {{ $t("AccountPage.method.RequestResendVerificationCode") }}
        </v-btn>
        <!-- sent the code again -->
        <v-alert 
          type="success"
          density="compact"
          class="my-2"
          variant="outlined"
          v-show="alert_resent_code"
        >
          {{ $t("AccountPage.success.ResentEmailVerificationCode") }}
        </v-alert>
        <!-- An error occurred while requesting resend the code -->
        <v-alert 
          type="error"
          density="compact"
          class="my-2"
          variant="outlined"
          v-show="alert_error_resent_code"
        >
          {{ $t("AccountPage.error.ResentEmailVerificationCode") }}
        </v-alert>
        <!-- the code you input is not match -->
        <v-alert 
          type="error"
          v-show="alert_code_mismatch"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.error.EmailVerificationCodeMismatch") }}
        </v-alert>
        <!-- the email updated -->
        <v-alert 
          type="success"
          v-show="alert_email_success"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.success.UpdateEmail") }}
        </v-alert>
        <!-- An error occurred while updating the email -->
        <v-alert
          type="error"
          v-show="alert_email_error"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.error.UpdateEmail") }}
        </v-alert>
        <v-divider class="my-3"></v-divider>
        <!-- change password btn -->
        <v-btn
          @click="form_change_password = true"
          variant="outlined"
          block
          class="my-2 mx-0"
          :disabled="form_change_password"
        >
          Change Password
        </v-btn>
        <!-- change password form -->
        <v-form
          v-show="form_change_password"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="password_old"
                :append-icon="show_password_old ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password_old ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                hide-details="auto"
                label="Old Password"
                hint="At least 8 characters"
                counter
                @click:append="show_password_old = !show_password_old"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="password_new"
                :append-icon="show_password_new ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password_new ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                hide-details="auto"
                label="New Password"
                hint="At least 8 characters"
                counter
                @click:append="show_password_new = !show_password_new"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9"></v-col>
            <v-col cols="3" class="pl-0 d-flex justify-center align-center">
              <v-btn
                variant="outlined"
                @click="changePassword"
                :disabled="loading_update_password"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- the password updated -->
        <v-alert 
          type="success"
          v-show="alert_password_success"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.success.UpdatePassword") }}
        </v-alert>
        <!-- An error occurred while updating the password -->
        <v-alert 
          type="error"
          v-show="alert_password_incorrect"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.error.PasswordIncorrect") }}
        </v-alert>
        <!-- An error occurred while updating the password -->
        <v-alert 
          type="error"
          v-show="alert_password_error"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          {{ $t("AccountPage.error.UpdatePassword") }}
        </v-alert>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'EditAccount',
  props: {
    initial_email: String,
    email_not_verified_yet: Boolean,
  },
  data() {
    return {
      email: this.initial_email,
      email_original: this.initial_email,
      email_verification_code: '',
      password_old: '',
      password_new: '',

      show_password_old: false,
      show_password_new: false,

      loading_update_email: false,
      loading_sendback_email_verification_code: false,
      loading_resent_code: false,
      loading_update_password: false,

      alert_sendback_email_verification_code: false,
      alert_email_success: false,
      alert_email_error: false,
      alert_code_mismatch: false,
      alert_resent_code: false,
      alert_error_resent_code: false,
      alert_email_not_verified_yet: this.email_not_verified_yet,
      alert_password_success: false,
      alert_password_error: false,
      alert_password_incorrect: false,

      form_email_verification_code: false,
      form_change_password: false,
    };
  },
  methods: {
    async updateEmail() {
      this.loading_update_email = true;

      this.alert_email_success = false;
      this.alert_email_error = false;
      this.alert_sendback_email_verification_code = false;
      this.alert_code_mismatch = false;
      this.form_email_verification_code = false;
      this.alert_resent_code = false;
      this.alert_error_resent_code = false;
      this.alert_email_not_verified_yet = false;
      this.form_email_verification_code = false;
      try {
        const user = await Auth.currentAuthenticatedUser();
        const result = await Auth.updateUserAttributes(user, {
          email: this.email,
        });
        if (result === 'SUCCESS') {
          this.alert_sendback_email_verification_code = true;
          this.form_email_verification_code = true;
        } else {
          throw result;
        }
      } catch (e) {
        console.error(e);
        this.alert_email_error = true;
      } finally {
        this.loading_update_email = false;
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
          this.alert_resent_code = false;
          this.alert_error_resent_code = false;
          this.alert_email_not_verified_yet = false;
          this.form_email_verification_code = false;
        }
      } catch (e) {
        if (e.name === 'CodeMismatchException') {
          this.alert_code_mismatch = true;
        } else {
          console.error(e);
          this.alert_email_error = true;
        }
      } finally {
        this.loading_sendback_email_verification_code = false;
      }
    },
    async requestResendVerificationCode() {
      this.loading_resent_code = true;

      this.alert_resent_code = false;
      this.alert_error_resent_code = false;
      try {
        const response = await Auth.verifyCurrentUserAttribute('email');
        if (response === 'SUCCESS') {
          this.alert_resent_code = true;
        } else {
          throw response;
        }
      } catch (e) {
        console.error(e);
        this.alert_error_resent_code = true;
      } finally {
        this.loading_resent_code = false;
      }
    },
    async changePassword() {
      this.loading_update_password = true;

      this.alert_password_success = false;
      this.alert_password_error = false;
      this.alert_password_incorrect = false;
      try {
        const user = await Auth.currentAuthenticatedUser();
        const result = await Auth.changePassword(
          user, this.password_old, this.password_new);
        if (result === 'SUCCESS') {
          this.alert_password_success = true;
          this.form_change_password = false;
          this.password_old = '';
          this.password_new = '';
        } else {
          throw result;
        }
      } catch (e) {
        if (e.name === 'NotAuthorizedException') {
          this.alert_password_incorrect = true;
        } else {
          console.error(e);
          this.alert_password_error = true;
        }
      } finally {
        this.loading_update_password = false;
      }
    }
  },
};
</script>
