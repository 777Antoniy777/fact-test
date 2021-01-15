<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from "@/views/Main.vue";

export default {
  name: "App",
  components: {
    Main
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
#app {
  padding-top: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 22px;
  line-height: 24px;
  text-align: center;
  color: #2c3e50;
}
</style>
