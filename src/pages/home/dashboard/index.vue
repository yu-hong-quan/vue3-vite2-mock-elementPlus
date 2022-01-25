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
              <span>尊敬的{{ userName }}</span>
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
              <div>昨日订单数</div>
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
              <div>待付款订单</div>
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
              <div>待发货订单</div>
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
              <div>售后中订单</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="home_bottom">
      <div class="bottom_left">
        <div id="myChart" :style="{ width: '600px', height: '550px' }"></div>
      </div>
      <div class="bottom_right">
        <div class="clearfix">
          <span>信息中心</span>
          <div>
            <el-button style="float: right; margin-right: 50px" type="danger"
              >批量删除</el-button
            >
          </div>
        </div>

        <el-table
          :show-header="false"
          :data="todoList"
          style="width: 100%"
          max-height="500px"
        >
          <el-table-column width="40">
            <template #default="scope">
              <el-checkbox v-model="scope.row.status"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template #default="scope">
              <div class="todo-item">
                <span
                  :class="{
                    'todo-item-del': scope.row.status,
                  }"
                  >{{ scope.row.title }}</span
                >
                <div class="icon-list">
                  <edit-outlined />
                  <delete-outlined />
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, reactive, computed } from "vue";
let userIncon = "user-outlined";
let userName = localStorage.getItem("ms_username");
let option = {};
// 获取当前组件的上下文
const { proxy } = getCurrentInstance(); // 此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）

const name = localStorage.getItem("ms_username");
const todoList = reactive([
  {
    title: "未处理订单30条",
    status: false,
  },
  {
    title: "未处理订单30条",
    status: false,
  },
  {
    title: "客户投诉问题10条",
    status: false,
  },
  {
    title: "未处理订单30条",
    status: false,
  },
  {
    title: "未处理订单30条",
    status: false,
  },
  {
    title: "客户投诉问题10条",
    status: false,
  },
  {
    title: "未处理订单30条",
    status: false,
  },
  {
    title: "未处理订单30条",
    status: false,
  },
  {
    title: "客户投诉问题10条",
    status: false,
  },
  {
    title: "未处理订单30条",
    status: false,
  },
  {
    title: "未处理订单30条",
    status: false,
  },
  {
    title: "客户投诉问题10条",
    status: false,
  },
]);
const data = [
  {
    name: "2018/09/04",
    value: 1083,
  },
  {
    name: "2018/09/05",
    value: 941,
  },
  {
    name: "2018/09/06",
    value: 1139,
  },
  {
    name: "2018/09/07",
    value: 816,
  },
  {
    name: "2018/09/08",
    value: 327,
  },
  {
    name: "2018/09/09",
    value: 228,
  },
  {
    name: "2018/09/10",
    value: 1065,
  },
];
const options = {
  type: "bar",
  title: {
    text: "最近一周各品类销售图",
  },
  xRorate: 25,
  labels: ["周一", "周二", "周三", "周四", "周五"],
  datasets: [
    {
      label: "家电",
      data: [234, 278, 270, 190, 230],
    },
    {
      label: "百货",
      data: [164, 178, 190, 135, 160],
    },
    {
      label: "食品",
      data: [144, 198, 150, 235, 120],
    },
  ],
};
const options2 = {
  type: "line",
  title: {
    text: "最近几个月各品类销售趋势图",
  },
  labels: ["6月", "7月", "8月", "9月", "10月"],
  datasets: [
    {
      label: "家电",
      data: [234, 278, 270, 190, 230],
    },
    {
      label: "百货",
      data: [164, 178, 150, 135, 160],
    },
    {
      label: "食品",
      data: [74, 118, 200, 235, 90],
    },
  ],
};

const role = computed(() => (name === "admin" ? "超级管理员" : "普通用户"));

const changeDate = () => {
  const now = new Date().getTime();
  data.forEach((item, index) => {
    const date = new Date(now - (6 - index) * 86400000);
    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  });
};

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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  transition: all 0.5s;
  .bottom_left {
    width: 600px;
    height: 600px;
    padding-right: 50px;
    border-right: 1px solid #eee;
  }
  .bottom_right {
    width: 100%;
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

<style scoped>
.el-row {
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
}
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
</style>
