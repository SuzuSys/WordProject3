<template>
  <v-card
    class="mx-auto my-12"
    max-width="500"
    variant="outlined"
  >
    <v-card-title>Edit Profile</v-card-title>
    <v-card-actions>
      <v-container class="pa-1">
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
  },
  data() {
    return {
      name: this.initial_name,
      loading_change_name: false,
    };
  },
  methods: {
    async changeName() {
      this.loading_change_name = true;
      
      try {
        const user = await Auth.currentAuthenticatedUser();
        const result = await Auth.updateUserAttributes(user, {
          name: 'jousei',
        });
        if (result === 'SUCCESS') {
          console.log(await Auth.currentAuthenticatedUser());
        } else {
          throw result;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading_change_name = false;
      }
    },
  },
};
</script>
