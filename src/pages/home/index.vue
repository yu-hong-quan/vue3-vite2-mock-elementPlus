<<<<<<< HEAD
<script setup>
  // 在 script setup 中，引入的组件可以直接使用，无需再通过components进行注册，并且无法指定当前组件的名字，它会自动以文件名为主，
  import HelloWorld from "coms/HelloWorld.vue";
  
=======
<script setup name="home">
import { computed } from "vue";
import { useStore } from "vuex";
import vHeader from "coms/layouts/Header.vue";
import vSidebar from "coms/layouts/Sidebar.vue";
import vTags from "coms/layouts/Tags.vue";

const { layout } = useStore().state;
const tagsList = computed(() => layout.tagsList.map((item) => item.name));
const collapse = computed(() => layout.collapse);
>>>>>>> eff88d8abd0eb45bc68f3e9b6bcc8d30e8f47938
</script>

<template>
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

<<<<<<< HEAD
<style scoped></style>
=======
<style lang="less" scoped>
@import '@/styles/common.less';
.about {
  width: 100%;
  height: 100%;
}
.content-box,
.about {
  background: @drawerBackgroundColor;
}
</style>
>>>>>>> eff88d8abd0eb45bc68f3e9b6bcc8d30e8f47938
