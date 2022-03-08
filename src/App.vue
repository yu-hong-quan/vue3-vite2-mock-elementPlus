<template>
  <router-view v-if="isRouterAlive" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>

import { onMounted, ref, provide, nextTick } from "vue";

let isRouterAlive = ref(true) // 控制 router-view 是否显示达到刷新效果且不会出现闪白情况

onMounted(() => {
  ElNotification.info({
    title: "欢迎光临《内卷吧》",
    message: "卷起来吧，前端人",
    "show-close": false,
    duration: 10000,
    offset: 104,
  });
});

provide('reload', () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
})

</script>

<style lang="less">
@import '@/styles/common.less';
@import '@/styles/main.less';
@import '@/styles/custom.less';
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
