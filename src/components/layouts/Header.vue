<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <el-icon v-if="!collapse"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </div>
    <div class="logo">Vue3 Element Plus Vite System</div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <el-icon><Bell /></el-icon>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon class="el-icon--right" :size="10">
              <ArrowDownBold />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Expand, Fold, Bell, ArrowDownBold } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const $store = useStore();
const router = useRouter();

let collapse = computed(() => $store.state.layout.collapse);
let message = ref(2);
const username = computed(() => {
  let username = localStorage.getItem("ms_username");
  return username ? username : name;
});

// 侧边栏折叠
const collapseChage = () => {
  $store.commit("layout/hadndleCollapse", !collapse.value);
};

// 用户名下拉菜单选择事件
const handleCommand = (command) => {
  if (command == "loginout") {
    localStorage.removeItem("ms_username");
    router.push("/login");
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  position: relative;
  font-size: 22px;
  color: #fff;
  overflow: hidden;
  .collapse-btn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    cursor: pointer;
  }
  .logo {
    float: left;
    width: 250px;
    line-height: 50px;
  }
  .header-right {
    float: right;
    padding-right: 20px;
  }
  .header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
    .btn-bell,
    .btn-fullscreen {
      position: relative;
      width: 30px;
      height: 30px;
      text-align: center;
      border-radius: 15px;
      cursor: pointer;
      margin-top: 5px;
    }
    .btn-bell-badge {
      position: absolute;
      right: 0;
      top: -2px;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: #f56c6c;
      color: #fff;
    }
    .btn-bell {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-bell {
        color: #fff;
      }
      a {
        color: #fff;
      }
    }
    .user-avator {
      margin-left: 20px;
      margin-right: 20px;
    }
    .user-avator img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .el-dropdown-link {
      color: #fff;
      cursor: pointer;
    }
    .el-dropdown-menu__item {
      text-align: center;
    }
  }
}
</style>
