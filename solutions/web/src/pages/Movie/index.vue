<template>
  <div class="black ">
    <v-container class="d-flex justify-center mt-16 bodyScreen">
      <v-card v-if="movie[0]" class="mb-16">
        <v-card-title class="d-flex justify-center">
          {{ movie[0].title }}
        </v-card-title>

        <v-img>
          <v-img :src="movie[0].poster" width="500px" />
        </v-img>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Movie-page",
  data() {
    return {
      movie: [],
    };
  },
  created() {
    this.getMovie();
  },
  methods: {
    async getMovie() {
      const response = await this.$apollo.query({
        query: require(`@/graphql/getMovie.gql`),
        variables: {
          movieId: this.$route.params.id,
        },
      });
      return (this.movie = response.data.Movie);
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
  },
};
</script>

<style>
.bodyScreen {      
  max-width: 1200px;  
}
</style>