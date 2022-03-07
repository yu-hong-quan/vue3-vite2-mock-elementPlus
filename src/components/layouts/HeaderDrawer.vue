<template>
  <div>
    <el-drawer v-model="isShow" :direction="direction" @close="hadeClose">
      <template #title>
        <h4>系统设置</h4>
      </template>
      <template #default>
        <div></div>
      </template>
      <template #footer>
        <div style="flex: auto"></div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance, reactive, ref, watch, defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// 获取当前组件的上下文
const { proxy } = getCurrentInstance(); // 此方法在开发环境以及生产环境下都能拿到组件上下文对象（推荐）
const $route = useRoute();
const $store = useStore();

// 获取父组件传来的值
const props = defineProps({
  isSetting: {
    type: Boolean,
    value: false
  }
})

// 自定义函数，父组件可以触发该函数用户子组件通信父组件
const em = defineEmits(['isParentDrawer'])
console.log(props.isSetting)
let isShow = ref(false)
isShow.value = props.isSetting

const direction = ref('rtl')

const hadeClose = (e) => {
  isShow.value = false;
  em('isParentDrawer', isShow.value)
}

watch(
  () => props.isSetting,
  (newValue, oldValue) => {
    isShow.value = newValue
  }
);
</script>

<style lang="less" scoped>
/deep/ .el-drawer {
  width: 21% !important;
}
</style>
