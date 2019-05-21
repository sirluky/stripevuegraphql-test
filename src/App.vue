<template>
  <div id="app">
    <!-- Navigační lišta: -->
    {{validate }}
    <div v-if="loggedIn">
      <router-view/>
    </div>
    <div v-else>
      <Auth/>

      <!-- produkty -->
    </div>

    <!-- <router-view/> -->
  </div>
</template>
<script>
let LogoutInterval;
import moment from 'moment/moment';
import gql from 'graphql-tag';
import Auth from './components/auth/auth';
import settings from '@/ProjectSettings.json';
import { setTimeout, clearTimeout } from 'timers';

// import Ukoly from '@/views/Ukoly.vue';
export default {
  components: {
    Auth,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  apollo: {
    validate: {
      query: gql`
        query {
          validate {
            type
            success
            expiration
          }
        }
      `,
      // pollInterval: 200000,
      // skip: () => localStorage.getItem('apollo-token'),
    },
  },
  computed: {
    // valid() {
    //   // console.log(this.validate);
    //   if (this.validate && this.validate.success === true) return true;
    //   else return false;
    // },
    accType: {
      set() {
        // console.log(this.validate);
        if (this.validate && this.validate.success) return this.validate.type;
        return 'none';
      },
      get() {
        if (this.validate && this.validate.success) return this.validate.type;
        return 'none';
      },
    },
  },
  watch: {
    validate() {
      if (this.validate && this.validate.success === true) {
        this.loggedIn = true;
        // console.log('valid ?', this.validate);

        let expirationIn = moment(Number(this.validate.expiration)).diff();
        if (LogoutInterval) {
          clearTimeout(LogoutInterval);
        }
        LogoutInterval = setTimeout(() => {
          this.loggedIn = false;
          this.$router.push('/login');
        }, expirationIn);

        this.$router.push(settings.homepage);
        this.accType = this.validate.type;
        return true;
      } else {
        this.$router.push('/login');
        return false;
      }
    },
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  background: rgb(224, 236, 191);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input,
textarea,
button {
  margin: 10px;
  padding: 5px;
  background: lightgray;
  font-family: 'Courier New', Courier, monospace;
  font-size: 25px;
  display: block;
  margin: 10px auto;
  resize: none;
}
textarea {
  height: 150px;
  background: rgb(233, 232, 232);
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
  width: 350px;
}
button,
input[type='checkbox'] {
  cursor: pointer;
}
.error-box {
  background: lightpink;
  color: darkmagenta;
  border: 5px solid darkmagenta;
  border-radius: 20px;
  padding: 10px;
  margin: 20px;
}
a {
  color: orange;
  transition: 100ms color;
}
a:hover {
  cursor: pointer;
  color: brown;
}
nav a {
  user-select: none;
}
nav {
}
button {
  transition: background 300ms;
}
</style>
