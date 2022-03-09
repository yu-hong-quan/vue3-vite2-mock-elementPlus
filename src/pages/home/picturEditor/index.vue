
<template>
  <div id="picturEditor">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> 图片自定义编辑 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <BasicContainer>
      <DrawingImg></DrawingImg>
    </BasicContainer>
  </div>
</template>

<script setup name="picturEditor">
import DrawingImg from 'coms/business/DrawingImg/index.vue'
import BasicContainer from "coms/vpro-materials/basic-container"
</script>

<style lang="less" scoped>
#picturEditor {
  width: 100%;
  height: 100%;
}
</style>
