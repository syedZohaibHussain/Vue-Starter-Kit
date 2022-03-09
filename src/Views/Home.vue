<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Starter Pack"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/Components/HelloWorld.vue'

export default {
  name: 'Home',
  layout: 'Dashboard',
  components: {
    HelloWorld
  }
}
</script>
