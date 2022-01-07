<script setup>
import HelloWorld from "coms/common/HelloWorld.vue"; //无需注册

const msg = "前端人，前端魂";
</script>

<template>
  <div class="home_title">首页</div>
  <HelloWorld :msg="msg" />
</template>

<style lang="less" scoped>
.home_title {
  font-size: 30px;
}
</style>
