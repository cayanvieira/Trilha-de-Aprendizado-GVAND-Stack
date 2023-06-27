<template>
  <div class="black">
    <v-container class="bodyWidth">
      <v-text-field
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        label="pesquisar"
        class="white ma-5"
      >
        Pesquisar
      </v-text-field>
      <v-card v-if='recommendedMovies[0]' class="white ma-5">
        <v-card-title> Recomendados </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-slide-group show-arrows>
            <v-slide-item v-for="(item, i) in recommendedMovies" :key="i">
              <v-card
                :key="i"
                class="grey mx-2 pa-1"
                width="20vw"
                min-width="256px"
                max-width="300px"
              >
                <v-card-title class="d-flex justify-center text-h6">
                  {{ item.Movie.title }}
                </v-card-title>
                <v-divider></v-divider>
                <div class="d-flex justify-center" v-if="!item.Movie.poster">
                  <v-img
                    class="mb-5"
                    src="../../assets/img/movie.png"                   
                  />
                </div>
                <div class="d-flex justify-center" v-if="item.Movie.poster">
                  <v-img
                    class="mb-5"
                    :src="item.Movie.poster"                    
                  />
                </div>
                <v-card-actions class="pa-3 d-flex justify-center">
                  <v-btn
                    fab
                    small
                    @click="ratedMovie(item.Movie.movieId, rated.value)"
                    v-for="(rated, i) in userMovieRated"
                    :key="i"
                    ><v-icon>{{ rated.icon }}</v-icon></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-card-actions>
      </v-card>
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
                :key="i"
                class="grey mx-2 pa-1"
                width="20vw"
                min-width="256px"
                max-width="300px"
              >
                <v-card-title class="d-flex justify-center text-h6">
                  {{ movie.title }}
                </v-card-title>
                <v-divider></v-divider>
                <div class="d-flex justify-center" v-if="!movie.poster">
                  <v-img class="mb-5" src="../../assets/img/movie.png" />
                </div>
                <div class="d-flex justify-center" v-if="movie.poster">
                  <v-img class="mb-5" :src="movie.poster" />
                </div>
                <v-card-actions class="pa-3 d-flex justify-center">
                  <v-btn
                    fab
                    small
                    @click="ratedMovie(movie.movieId, rated.value)"
                    v-for="(rated, i) in userMovieRated"
                    :key="i"
                    ><v-icon>{{ rated.icon }}</v-icon></v-btn
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
    userMovieRated: [
      { icon: "mdi-star", value: 1 },
      { icon: " mdi-star", value: 2 },
      { icon: "mdi-star", value: 3 },
      { icon: "mdi-star", value: 4 },
      { icon: "mdi-star", value: 5 },
    ],
    movies: null,
    moviesByGenre: {},
    recommendedMovies: [],
    user: null,
  }),
  watch: {},
  computed: {},
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.fecthGenres();
      await this.fecthMovies();
      await this.agroupByGenre();
      this.fetchUser();
      this.fetchRecommendedMovies();
    },
    agroupByGenre() {
      let result = {};

      this.genres.forEach((genre) => {
        Object.defineProperty(result, genre.name, {
          value: this.movies.filter((movie) => {
            return movie.in_genre[0].name === genre.name;
          }),
        });
      });
      this.moviesByGenre = result;

      return this.moviesByGenre;
    },
    fetchUser() {
      return (this.user = JSON.parse(localStorage.user));
    },
    async fecthMovies() {
      const fetchMovies = await this.$apollo.query({
        query: require(`@/graphql/fetchMovies.gql`),
      });

      return (this.movies = fetchMovies.data.Movie);
    },
    async fecthGenres() {
      const fetchGenres = await this.$apollo.query({
        query: require(`@/graphql/fetchGenres.gql`),
      });

      this.genres = fetchGenres.data.Genre;
    },
    async ratedMovie(movieId, rated) {
      const movieIsRated = await this.$apollo.query({
        query: require(`@/graphql/verifyMovieIsRated.gql`),
        variables: {
          userId: this.user.userId,
          movieId: movieId,
        },
      });
      if (!movieIsRated.data.User[0].rated[0]) {
        return await this.$apollo.mutate({
          mutation: require(`@/graphql/ratedMovie.gql`),
          variables: {
            userId: this.user.userId,
            movieId: movieId,
            rated: rated,
          },
        });
      }
      return null
      // await this.$apollo.mutate({
      //   mutation: require(`@/graphql/updateRateMovie.gql`),
      //   variables: {
      //     userId: this.user.userId,
      //     movieId: movieId,
      //     rated: rated,
      //   },
      // });
    },
    async fetchRecommendedMovies() {
      const response = await this.$apollo.query({
        query: require(`@/graphql/recommendedMovie.gql`),
        variables: {
          userId: this.user.userId,
        },
      });
      return (this.recommendedMovies = response.data.User[0].RATED_rel);
    },
  },
};
</script>
<style>
.bodyWidth {
  max-width: 1200px;
}
</style>