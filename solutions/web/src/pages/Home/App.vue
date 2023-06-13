<template >
  <v-app>
    <div class="black">
      <v-container>
        <v-text-field
          hide-details
          outlined
          prepend-inner-icon="mdi-magnify"
          label="pesquisar"
          class="white ma-5"
        >
          Pesquisar
        </v-text-field>
        <div class="white--text"></div>
        <v-card v-for="(genre, i) in genres" :key="i" class="white ma-5">
          <v-card-title>
            {{ genre }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="(movie, i) in moviesByGenre[genre]"
                :key="i"
                @click="() => true"
              >
                <v-card
                  @click="detail = movie"
                  :key="i"
                  class="grey mx-2"
                  width="20vw"
                  height="30vh"
                >
                  <v-card-title class="d-flex justify-center text-h6">
                    {{ movie.name }}
                  </v-card-title>
                  <v-divider></v-divider>
                  <div
                    class="d-flex justify-center"
                    width="200px"
                    height="100px"
                  >
                    <v-img
                      v-if="!movie.img"
                      src="../../assets/img/movie.png"
                      max-height="200px"
                      max-width="200px"
                    />
                  </div>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    detail: null,
    genres: ["Drama", "Comédia", "Ação", "Terror"],
    movies: [
      { name: "Drama", genre: "Drama" },
      { name: "Terror", genre: "Terror" },
      { name: "Comédia ", genre: "Comédia" },
      { name: "Ação", genre: "Ação" },
      { name: "Drama", genre: "Drama" },
      { name: "Drama", genre: "Drama" },
      { name: "Terror", genre: "Terror" },
      { name: "Comédia ", genre: "Comédia" },
      { name: "Ação", genre: "Ação" },
      { name: "Drama", genre: "Drama" },
      { name: "Drama", genre: "Drama" },
      { name: "Terror", genre: "Terror" },
      { name: "Comédia ", genre: "Comédia" },
      { name: "Ação", genre: "Ação" },
      { name: "Drama", genre: "Drama" },
      { name: "Drama", genre: "Drama" },
      { name: "Terror", genre: "Terror" },
      { name: "Comédia ", genre: "Comédia" },
      { name: "Ação", genre: "Ação" },
      // { name: "Drama", genre: "Drama" }, 
    ],
    moviesByGenre: {},
  }),
  created() {
    this.agroupByGenre();
  },
  computed: {},
  // apollo: {
  //   // Person: {
  //   //   query() {
  //   //     return require(`../../graphql/index.gql`);
  //   //   },
  //   //   variables() {}
  //   //   }
  // },
  methods: {
    agroupByGenre() {
      let result = {};
      this.genres.forEach((genre) => {
        Object.defineProperty(result, genre, {
          value: this.movies.filter((movie) => movie.genre === genre),          
        });
      });
      
      this.moviesByGenre = result
      
     
      return this.moviesByGenre
    },
  },
};
</script>
<!-- exemplo estrutura de dados de um filme 
{
  name:........,
  genre:.......,
  actor:.......,
  cartaz:....,
}


-->
<style>
</style>