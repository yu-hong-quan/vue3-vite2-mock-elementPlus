<template>
  <el-dialog
    v-model="dialogFormVisible"
    @close="dialogClose"
    :title="dialogTitle"
    width="30%"
    top="300px"
  >
    <slot></slot>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, defineProps, defineEmits, watch } from 'vue';
const { proxy } = getCurrentInstance(); // 此方法在开发环境以及生产环境下都能拿到组件上下文对象（推荐）
let dialogFormVisible = ref(false)
let dialogTitle = '';

// 获取父组件传来的值
const props = defineProps({
  dialogData: {
    type: Object,
  }
})
dialogTitle = props.dialogData.title

//自定义函数，父组件可以触发该函数用户子组件通信父组件
const em = defineEmits(['updata'])

watch(
  () => props.dialogData.visible,
  (newValue, oldValue) => {
    dialogFormVisible.value = newValue
  }
);

const dialogClose = () => {
  em("updata", false)
}

onMounted(() => {
})
</script>
<style lang="less" scoped>
</style>