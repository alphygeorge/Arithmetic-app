<template>
  <div id="app">
    <CalculatorComponent />
  </div>
</template>

<script>
import CalculatorComponent from './components/CalculatorComponent.vue';

export default {
  name: 'App',
  components: {
    CalculatorComponent
  }
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}
</style>
