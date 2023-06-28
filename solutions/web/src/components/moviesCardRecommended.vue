<template>
  <v-card class="white ma-5" v-if="recommendedMovies[0]">
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
            <div class="d-flex justify-center" v-if="item.Movie.poster">
              <v-card :to="`/movie/${item.Movie.movieId}`" class="transparent">
                <v-img :src="item.Movie.poster" />
              </v-card>
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
</template>

<script>
export default {
  name: "MoviesCard",
  props: {
    title: String,
    userId: String,
  },
  data() {
    return {
      recommendedMovies: [],
      userMovieRated: [
        { icon: "mdi-star", value: 1 },
        { icon: " mdi-star", value: 2 },
        { icon: "mdi-star", value: 3 },
        { icon: "mdi-star", value: 4 },
        { icon: "mdi-star", value: 5 },
      ],
    };
  },
  mounted() {
    this.fetchRecommendedMovies();
  },
  methods: {
    async fetchRecommendedMovies() {
      const response = await this.$apollo.query({
        query: require(`@/graphql/recommendedMovie.gql`),
        variables: {
          userId: this.userId,
        },
      });
      return (this.recommendedMovies = response.data.User[0].RATED_rel);
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
