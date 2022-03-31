<template>
  <div class="home">
    <HelloWorld />
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
