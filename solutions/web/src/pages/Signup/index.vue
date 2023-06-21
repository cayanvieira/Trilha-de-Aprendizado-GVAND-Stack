<template>
  <div class="black">
    <v-container class="d-flex justify-center align-center body">
      <v-card width="400px">
        <v-card-title class="d-flex justify-center"
          >Cadastrar usuário</v-card-title
        >

        <v-text-field
          v-model="form.name"
          label="Nome"
          outlined
          class="mx-5 mt-5"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn width="150px" to="/" >Voltar</v-btn>
          <v-spacer></v-spacer>
          <v-btn width="150px" @click="signup()">Cadastrar-se</v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-dialog
      v-model="alertRegister"
      class="d-flex align-center"
      width="600px"
      height="300px"
    >
      <v-card width="600px" height="100px" class="d-flex justify-center">
        <v-card-title> Cadastrado com Sucesso </v-card-title>
        <div class="d-flex align-center">
          <v-btn color="black white--text rounded-xl" to="/">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="alertInvalidName"
      class="d-flex align-center"
      width="600px"
      height="300px"
    >
      <v-card width="600px" height="100px" class="d-flex justify-center">
        <v-card-title> O "Nome" é inválido ou já Cadastrado! </v-card-title>
        <div class="d-flex align-center">
          <v-btn
            color="black white--text rounded-xl"
            @click="alertInvalidName = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-dialog> 
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Singup-Page",
  data() {
    return {
      rules: [(v) => !!v || "Campo obrigatório"],
      form: {
        name: null,
      },      
      alertInvalidName:false,
      alertRegister:false
    };
  },
  methods: {
    async signup(){        
        if(this.form.name === null){
            return this.alertInvalidName = true
        }
        const fetchUser = await this.$apollo.query({
              query: require(`@/graphql/fetchUser.gql`),
              variables: {userName:this.form.name},
              fetchPolicy:"no-cache"
            })
            
           if(fetchUser.data.User[0]){
              return this.alertInvalidName = true
           }
        await this.$apollo.mutate({
              mutation: require(`@/graphql/signup.gql`),
              variables: {name:this.form.name,userId:uuidv4()},
            });
        return this.alertRegister = true
    }
  },
};
</script>

<style>
.body {
  height: 100vh;
  width: 100vw;
}
</style>
