<template>
  <div class="black">
    <v-container class="d-flex justify-center align-center body">
      <v-card width="300px" height="300px">
        <v-card-title class="d-flex justify-center">Trilha</v-card-title>
        <div class="d-flex justify-center">
          <v-img
            src="../../assets/img/logo.png"
            max-height="100px"
            max-width="100px"
          ></v-img>
        </div>
        <v-text-field
        v-model="userName"
          label="Nome"
          outlined
          class="mx-5 mt-5"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn width="100px" to="/signup">Cadastrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn width="100px" @click="login()">Entrar</v-btn>
          <v-spacer></v-spacer>
         
        </v-card-actions>        
      </v-card>
    </v-container>
    <v-dialog
      v-model="alertUserNotFound"
      class="d-flex align-center"
      width="600px"
      height="300px"
    >
      <v-card width="600px" height="100px" class="d-flex justify-center">
        <v-card-title> Usuário não encontrado </v-card-title>
        <div class="d-flex align-center">
          <v-btn
            color="black white--text rounded-xl"
            @click="alertUserNotFound = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-dialog> 
  </div>
</template>

<script>
export default {
  name: "Login-Page",
  data: () => ({  
    userName:null,
    alertUserNotFound:false  
  }),
  methods: {
    async login() {      
      let response = await this.$apollo.query({
              query: require(`@/graphql/fetchUser.gql`),
              variables: {userName:this.userName},
            });
      if(response.data.User[0]){
        window.localStorage.setItem('user',JSON.stringify(response.data.User[0]))
        return this.$router.push('/home')
      }

       return this.alertUserNotFound=true
    },
  },
};
</script>
<style>
.body {
  height: 100vh;
  width: 100vw;
}
</style>
