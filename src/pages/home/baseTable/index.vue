<template>
  <div id="baseTable">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> 基础表格 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <BasicContainer>
      <div class="handle-box">
        <el-button
          type="primary"
          class="handle-del mr10"
          @click="delAllSelection"
          ><el-icon class="el-icon--left"><Delete /></el-icon
          >批量删除</el-button
        >
        <el-select
          v-model="query.address"
          placeholder="选择地址"
          class="handle-select mr10"
        >
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input
          v-model="query.name"
          placeholder="输入用户名"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" @click="handleSearch"
          ><el-icon class="el-icon--left"><Search /></el-icon>搜索</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
        v-loading="loadingBlan"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="账户余额">
          <template #default="scope">￥{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.state === '成功'
                  ? 'success'
                  : scope.row.state === '失败'
                  ? 'danger'
                  : ''
              "
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="注册时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.$index, scope)"
              style="width: 50px; height: 30px"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="handleDelete(scope.row)"
              style="width: 50px; height: 30px"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </BasicContainer>

    <!-- dialog对话框 -->
    <ComDialog :dialogData="dialogData" @updata="updata" @confirm="Confirm">
      <el-form ref="formRef" :model="editFormData" label-width="120px">
        <el-form-item label="用户名：">
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="账户余额：">
          <el-input v-model="editFormData.money" disabled></el-input>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-col :span="11">
            <el-date-picker
              v-model="editFormData.date"
              type="date"
              placeholder="请选择注册时间"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="头像：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="editFormData.thumb"
              :src="editFormData.thumb"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态：">
          <el-switch
            v-model="editFormData.state"
            active-value="成功"
            inactive-value="失败"
            inline-prompt
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="editFormData.address" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </ComDialog>
  </div>
</template>

<script setup name="baseTable">
import ComDialog from "coms/common/ComDialog/index.vue"
import { Delete, Search, Plus } from "@element-plus/icons-vue";
import hooks from "@/hooks/index"; // 引入自定义hooks
import { ref, onMounted, getCurrentInstance } from "vue"
const { proxy } = getCurrentInstance(); // 此方法在开发环境以及生产环境下都能拿到组件上下文对象（推荐）
// 对自定义hooks进行解构获取内部实例方法
let { showMessageBox } = hooks();

let query = ref({
  address: '',
  name: '',
  pageIndex: 1,
  pageSize: 10
})

let dialogData = ref({
  visible: false,
  title: '修改详情',
})

let editFormData = ref({
  name: '',
  money: '',
  date: '',
  state: '成功',
  thumb: '',
  address: '',
})

let tableData = ref([])
let multipleSelection = []
let delList = []
let editVisible = ref(false)
let pageTotal = ref(0)
let loadingBlan = ref(true)
let scopes = null

let idx = -1

onMounted(() => {
  getData()
})

// 获取easy-mock 的模拟数据
const getData = () => {
  proxy.$axios.get(`/api/table/getList`).then(res => {
    // console.log('列表数据：', res)
    setTimeout(() => {
      tableData.value = res.list
      pageTotal.value = res.pageTotal || 50
      loadingBlan.value = false
    }, 500)

  }).catch(err => {
    console.log(err)
  })
}

// 触发搜索按钮
const handleSearch = () => {
  query.pageIndex = 1
  getData()
}

// 删除操作
const handleDelete = (row) => {
  showMessageBox("温馨提示", "warning", "是否确认删除已选中的数据", true, true, 0, () => {
    tableData.value = tableData.value.filter(i => i.id !== row.id)
    return true;
  });
}

// 多选操作
const handleSelectionChange = val => {
  console.log(val);
  multipleSelection = val
}

// 删除多选的
const delAllSelection = () => {
  const length = multipleSelection.length
  if (length > 0) {
    showMessageBox("温馨提示", "warning", "是否确认删除已选中的数据", true, true, 0, () => {
      let str = ''
      delList = delList.concat(multipleSelection)
      for (let i = 0; i < length; i++) {
        str += multipleSelection[i].name + ' '
        tableData.value = tableData.value.filter(j => j.id !== multipleSelection[i].id)
      }
      ElMessage.error(`删除了${str}`)
      multipleSelection = []
      return true;
    })
  } else {
    ElMessage.warning(`请选择需要删除的项`)
  }
}

const handleAvatarSuccess = (res, file) => {
  editFormData.value.thumb = URL.createObjectURL(file.raw)
}
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isJPG) {
    ElMessage.error('Avatar picture must be JPG format!')
  }
  if (!isLt2M) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
  }
  return isJPG && isLt2M
}

// 编辑操作
const handleEdit = (index, scope) => {
  scopes = scope
  idx = index
  editFormData.value = scope.row
  console.log(editFormData.value)
  editVisible.value = true
  dialogData.value.visible = true
}

// 保存编辑
const saveEdit = () => {
  editVisible.value = false
  ElMessage.success(`修改第 ${idx + 1} 行成功`)
  tableData[idx] = editFormData
}

// 分页导航
const handlePageChange = val => {
  query.pageIndex = val
  getData()
}

const updata = (data) => {
  console.log('子组件传过来的值', data); //子组件传过来的值
  dialogData.value.visible = data
}

const Confirm = () => {
  showMessageBox("温馨提示", "error", "是否确认修改", true, true, 1, () => {
    tableData.value[scopes.$index] = editFormData.value
    dialogData.value.visible = false;
    return true;
  });
}
</script>

<style lang="less" scoped>
.handle-box {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .handle-select {
    width: 120px;
  }
  .handle-input {
    width: 200px;
    display: inline-block;
  }
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.el-input {
  width: 200px;
}
</style>

<style>
.el-table .el-table__cell {
  position: initial !important;
}
.el-input__prefix {
  top: 9px;
}
.el-picker__popper {
  z-index: 9999 !important;
}
.el-dialog__body .el-input__suffix {
  top: 9px;
}
</style>
