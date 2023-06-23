<template>
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
          {{ genre.name }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-slide-group show-arrows>
            <v-slide-item
              v-for="(movie, i) in moviesByGenre[genre.name]"
              :key="i"
              @click="() => true"
            >
              <v-card
                @click="detail = movie"
                :key="i"
                class="grey mx-2 pa-1"
                width="20vw"
                min-width="256px"
              >
                <v-card-title class="d-flex justify-center text-h6">
                  {{ movie.title }}
                </v-card-title>
                <v-divider></v-divider>
                <div class="d-flex justify-center" width="200px" height="100px">
                  <v-img
                    v-if="!movie.img"
                    class="mb-5"
                    src="../../assets/img/movie.png"
                    max-height="200px"
                    max-width="200px"
                  />
                </div>
                <v-card-actions class="pa-3 d-flex justify-center">
                  <v-btn
                    fab
                    small
                    v-for="(avaliation, i) in userMovieAvaliation"
                    :key="i"
                    ><v-icon>{{ avaliation.icon }}</v-icon></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
  
  <script>
export default {
  name: "Home-page",
  data: () => ({
    detail: null,
    genres: null,
    userMovieAvaliation: [
      { icon: "mdi-star", value: 1 },
      { icon: " mdi-star", value: 2 },
      { icon: "mdi-star", value: 3 },
      { icon: "mdi-star", value: 4 },
      { icon: "mdi-star", value: 5 },
    ],
    movies: null,
    moviesByGenre: {},
  }),
  watch: {},
  created() {
    this.init();
  },
  mounted() {},
  computed: {},
  methods: {
    async init() {
      await this.fecthGenres();
      await this.fecthMovies();
      await this.agroupByGenre();
    },
    agroupByGenre() {
      let result = {};
      
      this.genres.forEach((genre) => {
        Object.defineProperty(result, genre.name, {
            value: this.movies.filter((movie) => {             
              return movie.in_genre[0].name === genre.name
            })
          });
        });        
      this.moviesByGenre = result;
        
      return this.moviesByGenre;
    },
    async fecthMovies() {

      const fetchMovies = await this.$apollo.query({
        query: require(`@/graphql/fetchMovies.gql`),
      });

      return this.movies = fetchMovies.data.Movie;
    },
    async fecthGenres() {

      const fetchGenres = await this.$apollo.query({
        query: require(`@/graphql/fetchGenres.gql`),
      });

      this.genres = fetchGenres.data.Genre;
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