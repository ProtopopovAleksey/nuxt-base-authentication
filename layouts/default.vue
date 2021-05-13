<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-btn
        text
        to="/"
        class="ml-4"
      >
        Home
      </v-btn>
      <v-btn
        text
        to="/collections"
      >
        Collections
      </v-btn>
      <v-spacer/>
      <v-btn
        v-if="$auth.loggedIn"
        @click="logout"
        elevation="0"
      >
        Logout
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn
        v-else
        to="/login"
        elevation="0"
      >
        Login
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
      <snackbar/>
    </v-main>
    <v-footer
      app
    >
      <v-spacer></v-spacer>
      <span>Protopopov Aleksey - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import snackbar from '@/components/Snackbar.vue'

  export default {
    components: {snackbar},
    created() {
      // Неоптимальный вариант сохранения токена при обновлении страницы.
      // При наличии эндпоинта для получения данных о конкретном пользователе
      // данные будут обновляться автоматически под капотом auth-next.
      const token = this.$auth.strategy.token.get()
      if (token) {
        this.$store.dispatch('setTokenAuthorization', `${token}`)
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
          .then(() => {
            this.$notifier.showMessage({content: 'Выход произведен успешно', color: 'success'})
            this.$router.push('/')
          })
      }
    }
  }
</script>
