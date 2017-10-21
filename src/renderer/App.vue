<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-ele'
  }
</script>

<style>
  body,html{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif
  }
  #app{
    height: 100%;
  }
</style>
