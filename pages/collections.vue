<template>
  <v-row justify="center" align="center">
    <v-col cols="5" class="mt-10">
      <v-card class="">
        <v-card-text class="pt-4">
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="Название коллекции"
              v-model="title.value"
              :error-messages="title.error"
            ></v-text-field>
            <v-textarea
              label="Описание коллекции"
              v-model="description"
            ></v-textarea>
            <v-row justify="end" class="ma-0 mt-4">
              <v-btn
                :loading="isLoading"
                @click="submit"
                :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
              >
                Отправить
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Collections',
    middleware: 'auth-guard',
    data() {
      return {
        valid: false,
        title: {
          value: '',
          error: ''
        },
        description: '',
        isLoading: false
      }
    },
    methods: {
      async submit() {
        // Валидация поля отсутствует,
        // чтобы показать обработку ошибок сервера
        if (this.$refs.form.validate()) {
          this.isLoading = true
          this.title.error = ''
          try {
            const response = await this.$store.dispatch('setCollection', {
              title: this.title.value,
              description: this.description
            })
            this.$notifier.showMessage({
              content: `Коллекция ${response.collection.title} успешно создана!`,
              color: 'success'
            })
            this.title.value = ''
            this.description = ''
          } catch (error) {
            if (Array.isArray(error)) {
              error.forEach(error => (this.title.error = this.title.error + error.message + ' '))
            }
            this.$notifier.showMessage({content: 'Ошибка при создании коллекции', color: 'error'})
          } finally {
            this.isLoading = false
          }
        }
      }
    }
  }
</script>
