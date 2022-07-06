<template>
  <div class="dragSort">
    <BasicContainer>
      <div class="left-board">
        <el-scrollbar class="left-scrollbar">
          <div class="components-list">
            <div v-for="(item, listIndex) in comList" :key="listIndex">
              <div class="components-title">
                <!-- <svg-icon icon-class="component" /> -->
                {{ item.title }}
              </div>
              <Draggable
                class="components-draggable"
                draggable=".components-item"
                :sort="false"
                :list="item.list"
                :clone="cloneComponent"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                @end="onEnd"
                item-key="label"
              >
                <template #item="{ element }">
                  <div class="components-item">
                    <div class="components-body">
                      <!-- <Edit class="iconItem" /> -->
                      {{ element.label }}
                    </div>
                  </div>
                </template>
              </Draggable>
            </div>
          </div>
        </el-scrollbar>
      </div>

      <div class="center-board">
        <el-scrollbar>
          <el-form label-width="120px">
            <div class="center-scrollbar">
              <Draggable
                class="drawing-board"
                :list="drawingList.list"
                :animation="340"
                group="componentsGroup"
                item-key="label"
              >
                <template #item="{ element }">
                  <div class="drawing-item">
                    <el-form-item :label="element.label">
                      <template v-if="element.tagIcon == 'input'">
                        <el-input></el-input>
                      </template>
                      <template v-if="element.tagIcon == 'textarea'">
                        <el-input type="textarea"></el-input>
                      </template>
                      <template v-if="element.tagIcon == 'password'">
                        <el-input type="password"></el-input>
                      </template>
                      <template v-if="element.tagIcon == 'switch'">
                        <el-switch />
                      </template>
                    </el-form-item>
                    <el-icon
                      @click="delHandler(index)"
                      class="drawing-item-delete"
                      ><Delete
                    /></el-icon>
                  </div>
                </template>
              </Draggable>
            </div>
          </el-form>
        </el-scrollbar>
      </div>
    </BasicContainer>
  </div>
</template>

<script setup name="dragSort">
import { reactive, ref } from 'vue'
import { Delete, Edit } from "@element-plus/icons-vue";
import Draggable from 'vuedraggable'

let tempActiveData;
const comList = [
  {
    title: '输入型组件',
    list: [
      {
        label: '单行文本',
        tagIcon: 'input',
      },
      {
        label: '多行文本',
        tagIcon: 'textarea',
      },
      {
        label: '密码',
        tagIcon: 'password',
      },
    ],
  },
  // {
  //   title: '选择型组件',
  //   list: [],
  // },
  // {
  //   title: '布局型组件',
  //   list: [],
  // },
];
const drawingList = reactive({
  list: [
    {
      label: '单行文本',
      tagIcon: 'input',
    },
    {
      label: '多行文本',
      tagIcon: 'textarea',
    },
    {
      label: '密码',
      tagIcon: 'password',
    },
    {
      label: '开关',
      tagIcon: 'switch',
    }
  ]
});
// 拖动结束
const onEnd = (obj) => {
  if (obj.from != obj.to) {
    drawingList.list.splice(obj.newIndex, 0, tempActiveData);
  }
};
// 获取当前拖动的对象
const cloneComponent = (item) => {
  console.log('获取当前拖动的对象：', item)
  tempActiveData = item;
};
// 删除元素
const delHandler = (index) => {
  drawingList.list.splice(index, 1);
};


</script>

<style lang="less" scoped>
.basic-container {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}
.dragSort {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  .left-board {
    width: 15%;
    left: 0;
    top: 0;
    height: 100vh;
    .components-title {
      font-size: 14px;
      color: #222;
      margin: 6px 2px;
    }
    .components-item {
      display: inline-block;
      width: 48%;
      margin: 1%;
      // 限制拖动过去又来回的动画
      transition: transform 0ms !important;
      .components-body {
        padding: 8px 10px;
        background: #f6f7ff;
        font-size: 12px;
        cursor: move;
        border: 1px dashed #f6f7ff;
        border-radius: 3px;
        .iconItem {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
  .center-board {
    height: 100vh;
    width: 60%;
    margin: 0 10px;
    border-left: 1px solid #f1e8e8;
    border-right: 1px solid #f1e8e8;
    .center-scrollbar {
      padding: 12px 12px 15px 12px;
    }
    .drawing-item {
      padding: 10px 7.5px;
      position: relative;
      cursor: move;
      margin-bottom: 15px;
      &.active {
        background: #f6f7ff;
      }
    }
    .drawing-item-delete {
      right: 24px;
      border-color: #f56c6c;
      color: #f56c6c;
      background: #fff;
      position: absolute;
      top: -10px;
      width: 22px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      border-radius: 50%;
      font-size: 12px;
      border: 1px solid;
      cursor: pointer;
      z-index: 1;
    }
    .drawing-board {
      height: 100%;
      position: relative;
      .sortable-ghost {
        position: relative;
        display: block;
        overflow: hidden;
        // 当前列表切换排序的样式
        &::before {
          content: ' ';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 3px;
          background: rgb(89, 89, 223);
          z-index: 2;
        }
      }
      // 左边拖拽过来的样式
      .components-item.sortable-ghost {
        width: 100%;
        height: 60px;
        background-color: #f6f7ff;
        color: red;
      }
    }
  }
}
</style>
 