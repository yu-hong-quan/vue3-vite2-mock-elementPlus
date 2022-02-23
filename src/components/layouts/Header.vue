<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <el-icon v-if="!collapse"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </div>
    <div class="logo">{{ $t('PageTitle') }}</div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏 -->
        <el-tooltip
          class="item"
          effect="dark"
          :content="data.fullscreen ? '退出全屏' : '全屏'"
          placement="bottom"
        >
          <img
            class="suofangImg"
            :src="
              data.fullscreen
                ? '../../../src/assets/quxiaoquanpin.png'
                : '../../../src/assets/qunap.png'
            "
            alt=""
            @click="handleFullScreen"
          />
        </el-tooltip>
        <!-- 中英文切换 -->
        <img :src="i18nImg" alt="" class="i18nImg" @click="selecti18n()" />
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
              <a
                href="https://github.com/15017872695/vue3-vite2-mock-elementPlus"
                target="_blank"
              >
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>

import { Expand, Fold, Bell, ArrowDownBold } from "@element-plus/icons-vue";
import { onMounted, computed, ref, reactive, toRefs, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import hooks from "@/hooks/index"; // 引入自定义hooks
// 对自定义hooks进行解构获取内部实例方法
let { changeFullScreen, listenerEvent } = hooks();
const { proxy } = getCurrentInstance();

const $store = useStore();
const router = useRouter();
let collapse = computed(() => $store.state.layout.collapse);
let message = ref(2);
let i18nBln = ref(true)
let i18nImg = ref('')
const username = computed(() => {
  let username = localStorage.getItem("ms_username");
  return username ? username : name;
});

const data = reactive({
  fullscreen: false
})
listenerEvent(() => {
  data.fullscreen = !data.fullscreen
}, data)
// 全屏切换
const handleFullScreen = () => changeFullScreen(data)
const params = toRefs(data)



// 切换中英文
const selecti18n = () => {
  if (i18nBln.value) {
    i18nImg.value = '../../../src/assets/zh.png'
    i18nBln.value = !i18nBln.value;
    proxy.$i18n.locale = 'zh'
  } else {
    i18nImg.value = '../../../src/assets/en.png'
    i18nBln.value = !i18nBln.value;
    proxy.$i18n.locale = 'en'
  }
}


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

onMounted(() => {
  selecti18n()
})
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
    padding-right: 50px;
  }
  .header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
    .suofangImg {
      width: 30px;
      height: 30px;
      margin-right: 20px;
      cursor: pointer;
    }
    .i18nImg {
      width: 20px;
      height: 20px;
      margin-right: 20px;
      cursor: pointer;
    }
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

<style>
.btn-bell .el-icon {
  position: relative !important;
}
</style>
