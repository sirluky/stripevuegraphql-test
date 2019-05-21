<template>
  <section v-if="zobrazovat">
    <div class="stinic" @click="$emit('clickout')"/>
    <div class="produkt">
      <div class="exit" @click="$emit('clickout')">
        <i class="fas fa-times-circle"></i>
      </div>
      <ApolloQuery
        :query="gql => gql`
      query($id:ID!){
  produkt(id:$id){
    popis
    nazev
    cena
    kategorie
  }
}
    `"
        :variables="{ id }"
      >
        <!-- TODO -->
        <template v-slot="{ result: { loading, error, data }}">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occured</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <h1>{{data.produkt.nazev}}</h1>
            <big>{{data.produkt.cena}}</big>
            <br>
            <small>{{data.produkt.kategorie}}</small>
            <h3>Popis produktu</h3>
            <p>{{data.produkt.popis }}</p>
          </div>

          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </div>
  </section>
</template>

        
  

<script>
export default {
  props: {
    zobrazovat: Boolean,
    id: Number,
  },
};
</script>


<style scoped>
.produkt {
  display: block;
  background: white;
  padding: 50px;
  position: fixed;
  left: 50%;
  top: 50%;
  width: 500px;
  transform: translate(-50%, -90%);
}
.stinic {
  top: 0;

  position: fixed;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* width: 100%; */

  background: rgba(0, 0, 0, 0.719);
}
.exit {
  cursor: pointer;
  /* position: relative; */
  /* top: -50px; */

  /* padding-top: -50px; */
}
.exit > i {
  position: relative;
  top: -50px;
  z-index: 100;
  color: red;
  font-size: 30px;
  background: white;
  border-radius: 50%;
  left: 295px;
  transform: translate(0, -30%);
  transition: all 500ms;
  padding: 0;
  margin: 0;
}
.exit > i:hover {
  /* transform: rotate(60deg); */
}
</style>
