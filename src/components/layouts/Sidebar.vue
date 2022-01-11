<template>
  <div class="sidebar">
    <!-- <component :is="HomeFilled"></component> -->
    <el-menu
      :default-active="onRoutes"
      :collapse="collapse"
      class="sidebar-el-menu"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in sidebarList">
        <template v-if="item.subs"
          ><!-- 判断是否存在子菜单 -->
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem">{{
                subItem.title
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {
  HomeFilled,
  DocumentCopy,
  List,
  Document,
  WarningFilled,
} from "@element-plus/icons-vue";
import { computed, onMounted, getCurrentInstance, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// 获取当前组件的上下文
const { proxy } = getCurrentInstance(); // 此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）

const $route = useRoute();
const $store = useStore();
let sidebarList = ref([]);

let onRoutes = computed(() => $route.path.replace("/", ""));
let collapse = computed(() => $store.state.layout.collapse);

// watch(
//   () => [sidebarList.value],
//   (newVal, oldVal) => {
//     //此时返回的是数组,按下标获取对应值
//     console.log(newVal, oldVal);
//   },
//   { deep: true } //深度监听,深度监听用于监听一个复杂的对象
// );

onMounted(() => {
  proxy.$axios
    .get(`/api/getSubMenuList`)
    .then((res) => {
      sidebarList.value = res.list;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style lang="less" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
  ul {
    height: 100%;
  }
}
.sidebar::-webkit-scrollbar {
  display: none;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
</style>
