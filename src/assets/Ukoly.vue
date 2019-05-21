<template>
  <div>
    <!-- <button @click="splnitUkol(2)">test</button>
    -->
    <h2>Pridat ukol:</h2>
    <input type="text" v-model="ukoltext" @keypress.enter="pridatUkol">
    <h2>Seznam ukolu:</h2>
    <table v-if="ukoly">
      <tr>
        <th>ukol</th>
        <th>tlacitko splnit</th>
      </tr>
      <tr
        v-for="{text,id,splnen} in ukoly"
        :key="id"
        :style="{textDecoration:splnen ? 'line-through' : ''}"
      >
        <td>{{text}}</td>
        <td>
          <button
            :style="{background:splnen?'lightgray':''}"
            @click="splnitUkol(id,splnen)"
          >{{!splnen ? "Splnit" : "Smazat"}}</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
  created() {
    document.title = 'Moje ukoly';
  },
  data() {
    return {
      ukoltext: '',
    };
  },
  apollo: {
    ukoly: {
      query: gql`
        query {
          ukoly {
            text
            id
            splnen
          }
        }
      `,
      // pollInterval: 100,
    },
  },
  methods: {
    smazatUkol(id) {
      let MY_QUERY = gql`
        query {
          ukoly {
            text
            id
            splnen
          }
        }
      `;
      this.$apollo.mutate({
        mutation: gql`
          mutation($id: ID!) {
            smazatUkol(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: id,
        },
        update: (store, { data: { smazatUkol } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: MY_QUERY });
          let ukolIndex = data.ukoly.findIndex(d => d.id === smazatUkol.id);

          // Add our tag from the mutation to the end
          // data.tags.push(addTag);

          data.ukoly.splice(Number(ukolIndex), 1);
          // Write our data back to the cache.
          store.writeQuery({ query: MY_QUERY, data });
        },
      });
    },
    async pridatUkol() {
      this.ukoltext = this.ukoltext.trim();
      if (this.ukoltext) {
        this.$apollo.mutate({
          mutation: gql`
            mutation($text: String!, $autorID: ID!) {
              pridatUkol(text: $text, autorID: $autorID) {
                text
                id
                splnen
              }
            }
          `,
          variables: {
            text: this.ukoltext,
            autorID: 7,
          },
          update(store, novyUkol) {
            let MY_QUERY = gql`
              query {
                ukoly {
                  text
                  id
                  splnen
                }
              }
            `;
            novyUkol = novyUkol.data.pridatUkol;
            // console.log(novyUkol);
            let data = store.readQuery({ query: MY_QUERY });

            data.ukoly.push(novyUkol);

            store.writeQuery({ query: MY_QUERY, data });
          },
        });
        this.ukoltext = '';
      }
    },
    splnitUkol(id, splnen) {
      if (splnen) {
        this.smazatUkol(id);
      } else {
        this.$apollo.mutate({
          mutation: gql`
            mutation($id: ID!) {
              splnitUkol(id: $id) {
                text
                id
                splnen
              }
            }
          `,
          variables: {
            id,
          },
          update: (store, { data: data }) => {
            let UKOL_QUERY = gql`
              query {
                ukoly {
                  text
                  id
                  splnen
                }
              }
            `;
            let mydata = store.readQuery({ query: UKOL_QUERY });
            let ukolIndex = mydata.ukoly.findIndex(d => data.splnitUkol.id === d.id);
            mydata.ukoly[ukolIndex] = data.splnitUkol;
            store.writeQuery({ query: UKOL_QUERY, data: mydata });
          },
        });
      }
    },
  },
};
</script>

<style>
table {
  margin: auto;
  border: 1px solid black;
  padding: 20px;
}
th,
td {
  border: thin dashed black;
  padding: 5px;
}
td button {
  padding: 5px;
  background: goldenrod;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  border: 3px solid rgba(107, 39, 18, 0.11);
  border-radius: 5px;
  transition: background 300ms;
}
td button:hover:not(:disabled) {
  background: yellow;
  cursor: pointer;
}
td button:disabled {
  opacity: 0.3;
}
</style>
