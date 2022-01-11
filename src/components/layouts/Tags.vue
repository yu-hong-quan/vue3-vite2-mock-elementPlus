<template>
  <div class="tags">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagsList"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <el-icon :size="10">
            <CloseBold :style="isActive(item.path) ? 'color:#fff;' : ''" />
          </el-icon>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="default" type="primary">
          标签操作
          <el-icon :size="10">
            <ArrowDownBold style="position: absolute; right: -5px" />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ArrowDownBold, CloseBold } from "@element-plus/icons-vue";
import { computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const $router = useRouter();
const $route = useRoute();
const $store = useStore();
let tagsList = computed(() => $store.state.layout.tagsList);
let showTags = computed(() => tagsList.value.length > 0);

const isActive = (path) => {
  console.log("active:", path, $route.fullPath);
  return path === $route.fullPath;
};

// 关闭单个标签
const closeTags = (index) => {
  const delItem = tagsList.value[index];
  $store.commit("layout/delTagsItem", { index });
  const item = tagsList.value[index] ? tagsList.value[index] : tagsList.value[index - 1];
  if (item) {
    delItem.path === $route.fullPath && $router.push(item.path);
  } else {
    $router.push("/");
  }
};

// 关闭全部标签
const closeAll = () => {
  $store.commit("layout/clearTags");
  $router.push("/");
};

// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item) => item.path === $route.fullPath);
  $store.commit("layout/closeTagsOther", curItem);
};

// 设置标签
const setTags = ($route) => {
  const isExist = tagsList.value.some((item) => item.path === $route.fullPath);
  if (!isExist) {
    if (tagsList.value.length >= 8) {
      $store.commit("layout/delTagsItem", { index: 0 });
    }
    $store.commit("layout/setTagsItem", {
      name: $route.name,
      title: $route.meta.title,
      path: $route.fullPath,
    });
  }
};
const handleTags = (command) => {
  command === "other" ? closeOther() : closeAll();
};

onMounted(() => {
  setTags($route);
});

watch(
  () => $route.path,
  (newValue, oldValue) => {
    setTags($route);
  }
);
</script>

<style lang="less" scoped>
@import "@/styles/common.less";
.tags {
  position: relative;
  height: 40px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0px 12px 8px -12px #ccc;
  ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-wrap: nowrap;
    .tags-li {
      flex-shrink: 0;
      margin: 6px 0 0 7px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 23px;
      line-height: 23px;
      border: 1px solid #e9eaec;
      background: #fff;
      padding: 2px 8px 0 12px;
      vertical-align: middle;
      color: #666;
      -webkit-transition: all 0.3s ease-in;
      -moz-transition: all 0.3s ease-in;
      transition: all 0.3s ease-in;
      .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
      }
    }
    .tags-li:not(.active):hover {
      background: #f8f8f8 !important;
    }
  }
  ul::-webkit-scrollbar {
    width: 0;
  }
}
.tags-close-box {
  position: absolute !important;
  right: 15px;
  top: 0;
  box-sizing: border-box;
  padding-top: 3.5px;
  text-align: center;
  width: 100px;
  height: 23px;
  background: #fff;
  z-index: 10;
}
</style>
