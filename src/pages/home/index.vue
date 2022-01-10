<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
// import HelloWorld from "coms/common/HelloWorld.vue";
// const msg = "前端人，前端魂";
import vHeader from "coms/layouts/Header.vue";
import vSidebar from "coms/layouts/Sidebar.vue";
import vTags from "coms/layouts/Tags.vue";

const { layout } = useStore().state;
const tagsList = computed(() => layout.tagsList.map((item) => item.name));
const collapse = computed(() => layout.collapse);
</script>

<template>
  <!-- <HelloWorld :msg="msg" /> -->
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <!-- component标签创建动态组件，is属性指向谁，就显示哪个组件 -->
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
}
</style>
