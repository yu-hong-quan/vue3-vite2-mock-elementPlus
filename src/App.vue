<script setup>
ElNotification.info({
  title: "卷起来吧，前端人",
  message: "bug间，代码灰飞烟灭",
  duration: 0,
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
