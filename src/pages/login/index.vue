<template>
  <div class="login-wrap">
    <img
      src="@/assets/login-wrap-icon.png"
      alt="登录页背景人物"
      class="login-wrap-icon"
      draggable="false"
    />
    <div class="ms-login">
      <div class="ms-title">Vite Element Plus System</div>
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="userInfo.username" placeholder="请输入用户名">
            <template #prepend>
              <el-button class="inputBtn">
                <el-icon color="rgb(187,182,182)" class="no-inherit" :size="15">
                  <User />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="userInfo.password"
            @keyup.enter="submitForm()"
          >
            <template #prepend>
              <el-button class="inputBtn">
                <el-icon color="rgb(187,182,182)" class="no-inherit" :size="15">
                  <Lock />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">初始账号密码为admin</p>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import hooks from "@/hooks/index"; // 引入自定义hooks

// 对自定义hooks进行解构获取内部实例方法
let { showGlobalLoading, hideGlobalLoading } = hooks();

onMounted(() => {
  $store.commit("layout/clearTags");
});

const router = useRouter();
const login = ref(null);
const $store = useStore();

const userInfo = reactive({
  username: "admin",
  password: "admin",
});

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const submitForm = () => {
  login.value.validate((valid) => {
    if (valid) {
      showGlobalLoading();
      setTimeout(() => {
        hideGlobalLoading();
        localStorage.setItem("ms_username", userInfo.username);
        ElMessage.success("登录成功");
        router.push("/");
      }, 1000);
    } else {
      ElMessage.error("请输入账号和密码");
      hideGlobalLoading();
      return false;
    }
  });
};
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: linear-gradient(
    to right top,
    #6d327c,
    #485da6,
    #00a1ba,
    #00bf98,
    #36c486
  );
  background-size: 100%;
  .login-wrap-icon {
    position: absolute;
    right: 40px;
    bottom: 0;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -190px 0 0 -175px;
    width: 350px;
    border-radius: 15px;
    background-color: #292929;
    overflow: hidden;
    .ms-title {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #dadada;
      border-bottom: 1px solid #000;
    }
    .ms-content {
      padding: 30px 30px;
      .login-btn {
        text-align: center;
      }
      .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
        background-color: #36c486;
        border-color: #36c486;
      }
      .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
      }
    }
  }
}
:deep(.el-button) {
  height: 30px;
}
</style>
