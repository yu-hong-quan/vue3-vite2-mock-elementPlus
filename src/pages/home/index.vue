<script setup>
  // 在 script setup 中，引入的组件可以直接使用，无需再通过components进行注册，并且无法指定当前组件的名字，它会自动以文件名为主，
  import HelloWorld from "coms/HelloWorld.vue";
  
</script>

<template>
  <div>首页</div>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style scoped></style>
