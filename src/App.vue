<template>
  <div class="app">
    <keep-alive>
      <router-view name="alive"></router-view>
    </keep-alive>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang='scss'>
html {
  padding: 0;
  margin: 0;
  background-color: rgba(246, 246, 246, 1);
  .app{
    height: 100%;
  }
 
}


  


</style>
