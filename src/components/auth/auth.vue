<template>
  <div v-if="Pagelogin">
    <nav>
      <a to="/register" @click.prevent="register">Register</a>
    </nav>
    <LoginForm/>
  </div>
  <div v-else>
    <nav>
      <a to="/login" @click.prevent="login">Login</a>
    </nav>
    <RegisterForm/>
  </div>
</template>

<script>
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default {
  created: () => {},
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      Pagelogin: true,
    };
  },
  methods: {
    login() {
      this.$router.push('/login');
      this.Pagelogin = true;
    },
    register() {
      this.$router.push('/register');
      this.Pagelogin = false;
    },
  },
};
</script>

