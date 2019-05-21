<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <!-- <ul>
      <li v-for="users in allUsers" :key="users.key">
        {{users.firstName}} {{users.lastName}}
        <img
          :src="users.avatar"
          :alt="users.firstName + ' ' + users.lastName"
          width="30"
          height="30"
        >
      </li>
    </ul>-->
    <table style="margin:auto;text-align:left">
      <tr>
        <th>Jmeno + Prijimeni</th>
        <th>Avatar</th>
      </tr>
      <tr v-for="users in allUsers" :key="users.id">
        <td>{{users.firstName}} {{users.lastName}}</td>
        <td>
          <img
            :src="users.avatar"
            :alt="users.firstName + ' ' + users.lastName"
            width="30"
            height="30"
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import gql from 'graphql-tag';

export default {
  name: 'home',
  components: {},
  apollo: {
    allUsers: gql`
      query {
        allUsers {
          firstName
          lastName
          avatar
          id
        }
      }
    `,
  },
};
</script>

<style>
ul {
  text-align: left;
}
</style>
