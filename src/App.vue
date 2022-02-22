<template>
  <router-view />
</template>

<script setup>

import { onMounted } from "vue";
onMounted(() => {
  ElNotification.info({
    title: "欢迎光临《内卷吧》",
    message: "卷起来吧，前端人",
    "show-close": false,
    duration: 10000,
    offset: 104,
  });
});

</script>

<style>
@import '@/styles/common.less';
@import '@/styles/main.less';
#app,
body,
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.el-notification__group .el-icon {
  position: absolute !important;
}
.el-notification.right {
  right: 9px;
}
</style>
