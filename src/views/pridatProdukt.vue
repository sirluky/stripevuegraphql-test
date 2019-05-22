<template>
  <form @submit.prevent="pridatProdukt">
    <div class="error-box" v-if="problems.length !== 0">
      <ul>
        <li v-for="problem in problems" :key="problem">{{problem}}</li>
      </ul>
    </div>
    <label for="nazev">* Nazev</label>
    <input type="text" v-model="nazev">
    <label for="nazev">Popis</label>
    <textarea type="text" v-model="popis"/>
    <label for="cena">* Cena:</label>
    <input type="text" v-model="cena">
    <label for="kategorie">* Kategorie:</label>
    <input type="text" v-model="kategorie">
    <button type="submit">Pridat Produkt</button>
  </form>
</template>


<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      nazev: '',
      cena: '',
      kategorie: '',
      popis: '',
      problems: [],
    };
  },
  methods: {
    pridatProdukt() {
      let router = this.$router;
      let { nazev, cena, kategorie, popis } = this.$data;
      this.$apollo.mutate({
        mutation: gql`
          mutation($nazev: String!, $kategorie: String!, $cena: String!, $popis: String!) {
            pridatProdukt(nazev: $nazev, kategorie: $kategorie, cena: $cena, popis: $popis) {
              id
              accepted
            }
          }
        `,
        variables: {
          nazev,
          cena,
          kategorie,
          popis,
        },
        async update(
          store,
          {
            data: { pridatProdukt },
          },
        ) {
          const PRODUCT_QUERY = gql`
            {
              produkty {
                id
                nazev
                cena
                kategorie
              }
            }
          `;

          // console.log(pridatProdukt);
          if (pridatProdukt.accepted && pridatProdukt.id >= 0) {
            router.push('/produkty');
          }
          let produkty = store.readQuery({ query: PRODUCT_QUERY });
          // console.log(produkty);

          produkty.produkty.unshift({ id: pridatProdukt.id, nazev, cena, kategorie, __typename: 'Produkt' });

          store.writeQuery({ query: PRODUCT_QUERY, data: produkty });

          // console.log(login);
        },
      });
    },
  },
};
</script>
