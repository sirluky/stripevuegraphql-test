<template>
  <div class="about">
    <h1>Zpravy z domova</h1>
    <main>
      <section>
        <article v-for="{title,id,body,author} in allPosts" :key="id">
          <h3>{{title}}</h3>
          <p>{{body.slice(0,250)}}...</p>
          <img :src="author.avatar" :alt="author.firstName + ' ' + author.lastName">
          -
          <small>{{author.firstName}}</small>
          <hr>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    allPosts: gql`
      {
        allPosts(count: 10) {
          title
          id
          body
          author {
            firstName
            lastName
            avatar
          }
        }
      }
    `,
  },
};
</script>

<style scoped>
.about {
  max-width: 960px;
  margin: auto;
}
section {
  text-align: left;
}
main article img {
  width: 30px;
  height: 30px;
  padding: 3px 5px 3px 5px;
  margin-right: 4px;
  border: thin red solid;
  margin-bottom: -8px;
}
main article small {
  display: inline-block;
}
main article h3 {
  color: darkblue;
  font-family: Arial, Helvetica, sans-serif;
}
main article hr {
  border: 1px solid black;
  height: 0;
}
</style>
