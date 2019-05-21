<template>
  <div>
    <div class="error-box" v-if="problems.length !== 0">
      <ul>
        <li v-for="problem in problems" :key="problem">{{problem}}</li>
      </ul>
    </div>
    <form @submit.prevent="prihlasit">
      <label for="name">Prihlasovaci Email:</label>
      <input type="text" name="name" v-model="email">
      <label for="password">Vase Heslo:</label>
      <input type="password" name="password" v-model="password">
      <button type="submit">Prihlasit</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { onLogin } from '../../vue-apollo';
import settings from '@/ProjectSettings.json';
export default {
  data() {
    return {
      email: '',
      password: '',
      problems: [],
    };
  },
  methods: {
    async prihlasit() {
      this.problems = [];
      if (!this.email.trim()) this.problems.push('Nezadali jste prihlasovaci Email');
      if (!this.password) this.problems.push('Nezadali jste heslo');
      if (this.problems.length === 0) {
        const router = this.$router;

        // console.log('prihlasuju');
        const apolloClient = this.$apollo.provider.defaultClient;
        // let problems = this.problems;
        let self = this;
        this.$apollo.mutate({
          mutation: gql`
            mutation($email: String!, $password: String!) {
              login(email: $email, heslo: $password) {
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
              data: { login },
            },
          ) {
            // console.log(login);
            if (login.success) {
              await onLogin(apolloClient, login.token);
              router.push(settings.homepage);
            } else {
              self.problems.push('Zadali jste spatne jmeno nebo heslo.');
            }
            // console.log(login);
          },
        });
      }
    },
  },
};
</script>


