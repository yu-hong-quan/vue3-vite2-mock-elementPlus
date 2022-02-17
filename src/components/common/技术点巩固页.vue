<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import hooks from "@/hooks/index"; // 引入自定义hooks
import { useStore } from "vuex";

// 接收父组件传递过来的值
defineProps({
  msg: String,
});

// 对自定义hooks进行解构获取内部实例方法
let { showGlobalLoading, hideGlobalLoading } = hooks();

const $store = useStore();
let { userInfo } = $store.state.user;
$store.dispatch("user/asyncGetUserInfo", "前端人"); //用于调用user模块内asyncGetUserInfo这个方法

// 定义响应式数据
let refData = ref("bug间，代码灰飞烟灭"); //ref 是让基础数据类型具有响应式
let reactiveData = reactive([1, 2, 3, 4, 5, 6]); //reactive 是让引用数据类型具有响应式
const count = ref(0);

// 修改响应式数据
const resetProxyData = () => {
  refData.value = "一起内卷呀";
  reactiveData[0] = 3;
};

const route = useRouter();

// watch监听
watch(
  () => [route.currentRoute.value.path, refData.value, reactiveData],
  (newVal, oldVal) => {
    //此时返回的是数组,按下标获取对应值
    console.log(newVal, oldVal);
  },
  { deep: true } //深度监听,深度监听用于监听一个复杂的对象
);

// 获取当前组件的上下文
const { proxy } = getCurrentInstance(); // 此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）

const onSubmit = () => {
  proxy.$axios
    .post("/api/captcha/sent", {
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

/**
 * 生命周期
 */
onBeforeMount(() => {
  showGlobalLoading();
});
onMounted(() => {
  proxy.$axios
    .get(`/api/getUser`)
    .then((res) => {
      let users = res.data;
      console.log("users", users);
      hideGlobalLoading();
    })
    .catch((err) => {
      console.log(err);
      hideGlobalLoading();
    });
});
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <div class="info">
    <el-button>{{ userInfo.name }}</el-button>
    <el-button @click="onSubmit()">发起模拟请求方式</el-button>
    <span>{{ refData }}{{ reactiveData }}</span>
    <el-button @click="resetProxyData">修改响应式数据</el-button>
  </div>
</template>

<style lang="less" scoped>
.info {
  span {
    font-size: 30px;
  }
}
</style>
