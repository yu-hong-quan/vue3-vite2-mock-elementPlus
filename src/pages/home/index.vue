<script setup>
import HelloWorld from "coms/HelloWorld.vue"; //无需注册
import { ref, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { sendCaptcha } from "@/utils/api";

const $store = useStore();
let { userInfo } = $store.state.user;
$store.dispatch("user/asyncGetUserInfo", "前端人"); //用于调用user模块内asyncGetUserInfo这个方法

const msg = "前端人，前端魂";
// 定义响应式数据
let refData = ref("bug间，代码灰飞烟灭"); //ref 是让基础数据类型具有响应式
let reactiveData = reactive([1, 2, 3, 4, 5, 6]); //reactive 是让引用数据类型具有响应式
console.log(reactiveData);

// 修改响应式数据
const resetProxyData = () => {
  refData.value = "一起内卷呀";
  reactiveData[0] = 3;
};

// 获取当前组件的上下文，下面两种方式都能获取到组件的上下文
const { proxy } = getCurrentInstance(); //  方式二，此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
console.log(proxy.$http);

const onSubmit = () => {
  proxy.$http
    .post("/captcha/sent", {
      phone: 18700880154,
    })
    .then((res) => {
      //请求成功
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="home_title">首页</div>
  <div class="info">
    <el-button>{{ userInfo.name }}</el-button>
    <el-button @click="sendCaptcha({ phone: 18700880154 })">发起模拟请求方式1</el-button>
    <el-button @click="onSubmit">发起模拟请求方式2</el-button>
    <el-button @click="resetProxyData"
      ><span>{{ refData }}{{ reactiveData }}</span
      >修改响应式数据</el-button
    >
  </div>
  <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
  <HelloWorld :msg="msg" />
</template>

<style lang="less" scoped>
.home_title {
  font-size: 30px;
}
.info {
  span {
    font-size: 30px;
  }
}
</style>
