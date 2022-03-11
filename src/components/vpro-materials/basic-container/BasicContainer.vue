<template>
  <div class="basic-container">
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>

<script setup name="basic-container">

</script>

<style lang="less" scoped>
@import '@/styles/themes.less';
.basic-container {
  padding: 20px;
  margin-bottom: 20px;
  background-color: @contentBgColor;
  border-radius: 6px;
}
</style>