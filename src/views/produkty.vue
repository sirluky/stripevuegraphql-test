<template>
  <div>
    <ProduktDetail :zobrazovat="zobrazovat" @clickout="zobrazovat = false" :id="zobID"/>
    <nav>
      <ul>
        <li v-if="validate && validate.type === 'admin'">
          <router-link to="produkty/pridat">Pridat Produkt</router-link>
        </li>
      </ul>
    </nav>
    <h1>Seznam produktu</h1>
    <ul>
      <li v-for="{id,nazev,cena,kategorie} in produkty" :key="id">
        <h3>{{nazev +" - " + cena}} Kč</h3>
        <small>{{kategorie}}</small>
        <button @click="zobrazitProdukt(id)">Koupit</button>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ProduktDetail from '@/components/produktDetail';

export default {
  components: {
    ProduktDetail,
  },
  data() {
    return {
      zobrazovat: false,
      zobID: 1,
    };
  },
  apollo: {
    produkty: {
      query: gql`
        {
          produkty {
            id
            nazev
            cena
            kategorie
          }
        }
      `,
    },
    validate: {
      query: gql`
        query {
          validate {
            type
          }
        }
      `,
    },
  },
  methods: {
    zobrazitProdukt(id) {
      this.zobID = id;
      this.zobrazovat = true;
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  list-style: none;
  flex-shrink: 4;
  flex-direction: column;
}
li {
  margin: 20px;
  border: dotted red medium;
  background: white;
  padding: 20px;
  text-align: left;
  padding-bottom: 5px;
  flex-shrink: 4;
}
h3 {
  margin: 0;
}
small {
  /* margin: 4px; */
}
button {
  padding: 10px;
  color: yellow;
  background: red;
  border-radius: 10px;
  font-size: 20px;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  margin-top: 10px;
  box-shadow: -2px -2px 2px 2px rgb(273, 226, 230), -2px 2px 2px 2px rgb(173, 226, 230),
    2px -2px 2px 2px rgb(273, 226, 230), 2px 2px 2px 2px rgb(173, 216, 230);
}
button:hover {
  background: blue;
}
</style>
