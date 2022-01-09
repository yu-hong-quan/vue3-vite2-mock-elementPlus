<script setup>
import HelloWorld from "coms/common/HelloWorld.vue"; //无需注册

const msg = "前端人，前端魂";
</script>

<template>
  <!-- <HelloWorld :msg="msg" /> -->
  <router-view></router-view>
</template>

<style lang="less" scoped>

</style>
