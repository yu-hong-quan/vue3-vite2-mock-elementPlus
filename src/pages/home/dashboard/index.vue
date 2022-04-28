<template>
  <div class="dashboard">
    <el-row>
      <el-col>
        <el-card shadow="hover" class="box-card">
          <div class="card_left">
            <el-icon :size="30" color="#00A1BA">
              <component :is="userIncon"></component>
            </el-icon>
            <div class="left_info">
              <span>尊敬的{{ role }}</span>
              <span
                >基于Vue3 + Vite + Element Plus + Ant Design Vue
                开发的后台管理系统模板</span
              >
            </div>
          </div>
          <div class="card_right"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <i class="el-icon-s-order grid-con-icon">
              <container-outlined />
            </i>
            <div class="grid-cont-right">
              <div class="grid-num">1234</div>
              <div class="grid-text">昨日订单数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-2">
            <i class="el-icon-message-solid grid-con-icon">
              <bell-outlined />
            </i>
            <div class="grid-cont-right">
              <div class="grid-num">321</div>
              <div class="grid-text">待付款订单</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-3">
            <i class="el-icon-s-goods grid-con-icon">
              <audit-outlined />
            </i>
            <div class="grid-cont-right">
              <div class="grid-num">5000</div>
              <div class="grid-text">待发货订单</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-4">
            <i class="el-icon-s-goods grid-con-icon">
              <solution-outlined />
            </i>
            <div class="grid-cont-right">
              <div class="grid-num">200</div>
              <div class="grid-text">售后中订单</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="home_bottom">
          <div class="bottom_right">
            <div class="clearfix">
              <span>消息中心</span>
              <div>
                <el-button
                  style="float: right; margin-right: 50px"
                  type="danger"
                  @click="allDelect"
                  >批量删除</el-button
                >
              </div>
            </div>
            <el-table
              :show-header="false"
              :data="todoList"
              style="width: 100%"
              max-height="500px"
              header-cell-class-name="table-header"
              ref="multipleTable"
              v-loading="loadingBlan"
            >
              <el-table-column width="40">
                <template #default="scope">
                  <el-checkbox v-model="scope.row.status"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column>
                <template #default="scope">
                  <div class="todo-item">
                    <span :class="{ 'todo-item-del': scope.row.status }">{{
                      scope.row.title
                    }}</span>
                    <div class="icon-list">
                      <edit-outlined @click="updateFnc(scope)" />
                      <delete-outlined @click="itemDelect(scope)" />
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="bottom_left">
            <div
              id="myChart"
              :style="{ width: '600px', height: '550px' }"
            ></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- dialog对话框 -->
    <ComDialog :dialogData="dialogData" @updata="updata" @confirm="Confirm">
      <el-form :model="dialogData">
        <el-form-item label="标题：" label-width="140px">
          <el-input
            v-model="dialogData.name"
            autocomplete="off"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
      </el-form>
    </ComDialog>
  </div>
</template>

<script setup name="dashboard">
import { onMounted, computed, getCurrentInstance, ref, reactive } from "vue";//通过reactive定义的响应式数据是不需要通过.value或取其里面的子数据的，并且请勿对reactive定义的响应式数据执行解构操作，否则会失去响应式
import ComDialog from "coms/common/ComDialog/index.vue"
import hooks from "@/hooks/index"; // 引入自定义hooks

// 获取当前组件的上下文
const { proxy } = getCurrentInstance(); // 此方法在开发环境以及生产环境下都能拿到组件上下文对象（推荐）
// 对自定义hooks进行解构获取内部实例方法
let { showMessageBox } = hooks();

let userIncon = "user-outlined";
let userName = localStorage.getItem("ms_username");
const todoList = ref([]);
const role = computed(() => (userName === "admin" ? "超级管理员" : "普通用户"));
let delList = []
let dialogData = ref({
  visible: false,
  title: '修改信息',
  name: ''
})
let scopes = null;
let loadingBlan = ref(true)

let updateFnc = (scope) => {
  scopes = scope;
  dialogData.value.name = scope.row.title
  dialogData.value.visible = true
}

const updata = (data) => {
  console.log('子组件传过来的值', data); //子组件传过来的值
  dialogData.value.visible = data
}

// 获取站内信数据
const getListData = () => {
  proxy.$axios
    .get(`/api/unprocessedOrders`)
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        todoList.value.push(...res.list);
        loadingBlan.value = false
      }, 500)
    })
    .catch((err) => {
      console.log(err);
    });
};

const allDelect = () => {
  delList = todoList.value.filter(j => j.status === true)
  if (delList.length > 0) {
    showMessageBox("温馨提示", "warning", "是否确认删除已选中的数据", true, true, 0, () => {
      for (let i = 0; i < delList.length; i++) {
        todoList.value = todoList.value.filter(j => j.id !== delList[i].id)
      }
      return true;
    })
  } else {
    ElMessage.warning(`请选择需要删除的项`)
  }
};

const itemDelect = (scope) => {
  let { row, $index } = scope;
  showMessageBox("温馨提示", "error", "是否确认删除", true, true, 0, () => {
    todoList.value = todoList.value.filter(j => j.id !== row.id)
    return true;
  });
};

const Confirm = () => {
  showMessageBox("温馨提示", "error", "是否确认修改", true, true, 1, () => {
    todoList.value[scopes.$index].title = dialogData.value.name
    dialogData.value.visible = false;
    return true;
  });
}

// 挂在完成时
onMounted(() => {
  let myChart = proxy.$echarts.init(document.getElementById("myChart"));
  myChart.setOption({
    dataset: {
      source: [
        ["score", "amount", "product"],
        [89.3, 58212, "Matcha Latte"],
        [57.1, 78254, "Milk Tea"],
        [74.4, 41032, "Cheese Cocoa"],
        [50.1, 12755, "Cheese Brownie"],
        [89.7, 20145, "Matcha Cocoa"],
        [68.1, 79146, "Tea"],
        [19.6, 91852, "Orange Juice"],
        [10.6, 101852, "Lemon Juice"],
        [32.7, 20112, "Walnut Brownie"],
      ],
    },
    grid: { containLabel: true },
    xAxis: { name: "amount" },
    yAxis: { type: "category" },
    visualMap: {
      orient: "horizontal",
      left: "center",
      min: 10,
      max: 100,
      text: ["High Score", "Low Score"],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#65B581", "#FFCE34", "#FD665F"],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "product",
        },
      },
    ],
  });

  getListData();
});
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}
.box-card {
  width: 100%;
  display: flex;
  align-items: center;
  .card_left {
    display: flex;
    align-items: center;
    .left_info {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      > span:nth-child(1) {
        font-size: 25px;
        margin-bottom: 10px;
      }
      > span:nth-child(2) {
        color: #888;
      }
    }
  }
}

.home_bottom {
  background: #fff;
  border-radius: 3px;
  transition: all 0.5s;
  overflow: hidden;
  .bottom_left {
    width: 600px;
    height: 600px;
    padding-right: 50px;
    border-right: 1px solid #eee;
    float: right;
  }
  .bottom_right {
    float: left;
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
    .clearfix {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span {
        margin-bottom: 10px;
      }
    }
  }
  .bottom_right::-webkit-scrollbar {
    width: 0;
  }
}
.home_bottom:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>

<style lang="less" scoped>
@import '@/styles/themes.less';
.el-row {
  width: 100%;
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
}
.grid-text {
  color: @navbarColor;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-date-icon {
  color: #00a1ba;
  font-size: 40px;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.grid-con-4 .grid-con-icon {
  background: rgb(247, 112, 146);
}

.grid-con-4 .grid-num {
  color: rgb(247, 112, 146);
}
.mgb20 {
  margin-bottom: 20px;
  margin-left: 0 !important;
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todo-item .icon-list {
  width: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #24adf3;
  margin-right: 30px;
}
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.el-input {
  width: 200px;
}
</style>
