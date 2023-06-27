<template>
  <router-view />
  <Footer />
</template>

<script>
import HomeView from "./views/HomeView";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    HomeView,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,500;1,600&display=swap");

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
  position: relative;
}
</style>
