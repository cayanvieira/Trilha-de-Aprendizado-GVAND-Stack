<template>
  <v-card class="transparent">
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
              <div class="d-flex justify-center" v-if="movie.poster">
                <v-card :to="`/movie/${movie.movieId}`">
                  <v-img :src="movie.poster" />
                </v-card>
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
  </v-card>
</template>

<script>
export default {
  props: {
    userId: String,
  },
  data() {
    return {
      genres: null,
      movies: null,
      moviesByGenre: null,
      userMovieRated: [
        { icon: "mdi-star", value: 1 },
        { icon: " mdi-star", value: 2 },
        { icon: "mdi-star", value: 3 },
        { icon: "mdi-star", value: 4 },
        { icon: "mdi-star", value: 5 },
      ],
    };
  },
  async mounted() {
    await this.fecthGenres();
    await this.fecthMovies();
    await this.agroupByGenre();
  },
  methods: {
    async fecthGenres() {
      const fetchGenres = await this.$apollo.query({
        query: require(`@/graphql/fetchGenres.gql`),
      });

      this.genres = fetchGenres.data.Genre;
    },
    async fecthMovies() {
      const fetchMovies = await this.$apollo.query({
        query: require(`@/graphql/fetchMovies.gql`),
      });

      return (this.movies = fetchMovies.data.Movie);
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
    async ratedMovie(movieId, rated) {
      const movieIsRated = await this.$apollo.query({
        query: require(`@/graphql/verifyMovieIsRated.gql`),
        variables: {
          userId: this.userId,
          movieId: movieId,
        },
      });
      if (!movieIsRated.data.User[0].rated[0]) {
        return await this.$apollo.mutate({
          mutation: require(`@/graphql/ratedMovie.gql`),
          variables: {
            userId: this.userId,
            movieId: movieId,
            rated: rated,
          },
        });
      }
      return await this.$apollo.mutate({
        mutation: require(`@/graphql/updateRateMovie.gql`),
        variables: {
          userId: this.userId,
          movieId: movieId,
          rated: rated,
        },
      });
    },
  },
};
</script>

<style>
</style>