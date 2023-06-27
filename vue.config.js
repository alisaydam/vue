const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/scss/_reset.scss";
        @import "@/scss/_variables.scss";
        `,
      },
    },
  },
};
 
//target: "https://sw-api.000webhostapp.com",
 

module.exports = {
  publicPath: "./",
};
