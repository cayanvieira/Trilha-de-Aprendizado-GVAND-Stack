<template>
  <div class="black">
    <v-container class="bodyWidth">
      <search-item />
      <movies-card-recommended :userId="user.userId" />
      <movies-card-group-by-genre :userId="user.userId" />
    </v-container>
  </div>
</template>
  
<script>
import moviesCardRecommended from "../../components/moviesCardRecommended.vue";
import moviesCardGroupByGenre from "@/components/moviesCardGroupByGenre.vue";
import searchItem from "../../components/searchItem.vue";

export default {
  components: { moviesCardRecommended, searchItem, moviesCardGroupByGenre },
  name: "Home-page",
  data: () => ({
    user: null,
  }),
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      return (this.user = JSON.parse(localStorage.user));
    },
  },
};
</script>
<style>
.bodyWidth {
  max-width: 1200px;
}
</style>