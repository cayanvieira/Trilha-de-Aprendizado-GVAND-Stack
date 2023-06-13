const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pages:{
    index:{
      entry:'./src/pages/Home/main.js',
      title:'Home'
    },
    login:{
      entry:'./src/pages/Login/main.js',
      title:'Login'
    }
  }
})
