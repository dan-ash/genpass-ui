<template>
  <div id="app">
    <h1>Password Generator</h1>
    <PasswordGenerator />
  </div>
</template>

<script>
import PasswordGenerator from './components/PasswordGenerator.vue'

export default {
  name: 'App',
  components: {
    PasswordGenerator
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin-bottom: 2rem;
}
</style> 