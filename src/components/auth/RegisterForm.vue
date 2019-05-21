<template>
  <div>
    <div class="error-box" v-if="problems.length !== 0">
      <ul>
        <li v-for="problem in problems" :key="problem">{{problem}}</li>
      </ul>
    </div>
    <form @submit.prevent="registrovat">
      <label for="name">Tvuj Email:</label>
      <input type="email" name="name" v-model="email">
      <label for="password">Tvoje Heslo:</label>
      <input type="password" v-model="password">
      <label for="podminky">Souhlasim s podminkama, ktere ale nevidis...</label>
      <input type="checkbox" name="podminky" v-model="podminky" style="display:inline">
      <button type="submit">Registrovat</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { onLogin } from '@/vue-apollo';
import settings from '@/ProjectSettings.json';

export default {
  data() {
    return {
      email: '',
      // age: '',
      password: '',
      podminky: false,
      problems: [],
    };
  },
  methods: {
    async registrovat() {
      this.problems = [];
      let self = this;
      if (!this.email.trim()) this.problems.push('Nezadali jste Email');
      if (!this.password) this.problems.push('Nezadali jste heslo');
      if (!this.podminky) this.problems.push('Musite prijmout podminky');

      if (this.problems.length === 0) {
        // console.log('prihlasuju');
        const router = this.$router;
        const apolloClient = this.$apollo.provider.defaultClient;
        this.$apollo.mutate({
          mutation: gql`
            mutation($email: String!, $password: String!) {
              register(email: $email, heslo: $password) {
                success
                token
              }
            }
          `,
          variables: {
            email: this.email,
            password: this.password,
          },
          async update(
            store,
            {
              data: { register },
            },
          ) {
            if (register && register.success) {
              await onLogin(apolloClient, register.token);
              router.push(settings.homepage);
            } else {
              self.problems.push('Uzivatelske jmeno je obsazeno');
            }
            // console.log(login);
          },
        });
      }
    },
  },
};
</script>
