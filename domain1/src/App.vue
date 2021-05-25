<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <button v-on:click="navigate">Click to navigate</button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import * as Sentry from "@sentry/vue";

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    navigate: () => {
      const transaction = Sentry.startTransaction({
        op: "default",
        name: 'domain1_start',
      });
      const span = transaction.startChild({
        op: 'child',
        name: 'domain1_child',
      });

      // mocking out child span times
      setTimeout(() => {
        span.finish();
        transaction.finish();

        // Set a timeout so there is enough time for a transaction to finish and be sent to Sentry
        setTimeout(() => {
          window.location.href = `http://localhost:8080/?sentryTrace=${transaction.toTraceparent()}`;
        }, 1000);
      }, 1000);
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
