<template>
  <v-row justify="center" align="center">
    <v-col cols="4" class="mt-10">
      <v-card class="">
        <v-card-text class="pt-4">
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="Enter your e-mail"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              label="Enter your password"
              v-model="password"
              min="8"
              :append-icon="passVisibility ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (passVisibility = !passVisibility)"
              :type="passVisibility ? 'password' : 'text'"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-row justify="end" class="ma-0 mt-4">
              <v-btn @click="submit" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Login</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        valid: false,
        passVisibility: true,
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must contain at least 6 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      async submit() {
        if (this.$refs.form.validate()) {
          try {
            const response = await this.$store.dispatch('login', {username: this.email, password: this.password})
            this.$notifier.showMessage({content: `Привет user ${response.user.id}!`, color: 'success'})
            this.$router.push('/')
          } catch (error) {
            this.$notifier.showMessage({content: error.message, color: 'error'})
          }
        }
      }
    }
  }
</script>
