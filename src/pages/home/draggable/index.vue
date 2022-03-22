<!--
 * @Descripttion: 
 * @Author: 小余
 * @Date: 2022-01-10 09:48:05
 * @LastEditors: voanit
 * @LastEditTime: 2022-03-22 18:28:17
-->
<template>
  <div id="draggable">
    <BasicContainer>
      <h3 style="text-align: center">标签选择</h3>
      <div class="dragList-list1">
        <Draggable
          v-model="list2"
          item-key="id"
          :animation="100"
          :sort="true"
          :group="{ name: 'article', pull: 'clone' }"
          @end="end1"
          class="dragArea1"
        >
          <template #item="{ element }">
            <div class="list-complete-item1">
              <div class="list-complete-item-handle2">{{ element.name }}</div>
            </div>
          </template>
        </Draggable>
      </div>

      <h3 style="text-align: center; margin-top: 100px">拖动至此处</h3>
      <div class="dragList-list2">
        <Draggable
          v-model="list1"
          item-key="id"
          :group="{ name: 'article', pull: '' }"
          :disabled="false"
          @start="start2"
          @end="end2"
          class="dragArea2"
        >
          <template #item="{ element, index }">
            <div class="list-complete-item2">
              <div class="list-complete-item-handle">{{ element.name }}</div>
              <div>
                <Delete
                  class="el-icon-delete"
                  @click="handleDel(index, element.id)"
                />
              </div>
            </div>
          </template>
        </Draggable>
      </div>
    </BasicContainer>
  </div>
</template>

<script setup name="draggable">
import { Delete } from "@element-plus/icons-vue";
import Draggable from 'vuedraggable'
import { ref, reactive } from 'vue'


const disabled = ref(false)
const list1 = reactive([])
const list2 = reactive(
  [
    { id: 1, name: '标签1' },
    { id: 2, name: '标签2' },
    { id: 3, name: '标签3' },
    { id: 4, name: '标签4' },
    { id: 5, name: '标签5' },
    { id: 9, name: '标签6' },
    { id: 7, name: '标签7' },
    { id: 8, name: '标签8' },
    { id: 9, name: '标签9' },
    { id: 10, name: '标签10' },
  ]
)

const end1 = (ev) => {
  console.log("从上方拖入下方", ev)
  console.log(ev.item._underlying_vm_)
  let data = ev;
  if (ev.to.className === 'dragArea2') {
    list1.splice(data.newIndex, 0, data.item._underlying_vm_)
  }

  // for (let index = 0; index < list2.length; index++) {
  //   const element = list2[index];
  //   if (data.item._underlying_vm_.id !== element.id) {
  //     console.log(element.id)
  //   }
  // }
}

const start2 = (event) => {
  console.log("开始拖动", event)
}

const end2 = (ev) => {
  console.log("从下方拖入上方", ev)
}

const handleDel = (index, id) => {
  list1.splice(index, 1)
  let q = list2.find((value, index, arr) => {
    return value.id === id
  })
}
</script>

<style lang="less" scoped>
.dragList-list1 {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.list-complete-item1 {
  cursor: pointer;
  font-size: 14px;
  padding: 0 12px;
  display: inline-block;
  margin-bottom: 10px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
  text-align: center;
}
.dragArea1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.dragList-list2 {
  margin-top: 20px;
  height: 200px;
  border: 1px solid #8a8a8a;
}
.dragArea2 {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
}
.list-complete-item2 {
  cursor: pointer;
  font-size: 14px;

  display: inline-block;
  margin: 10px;
  width: 100px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}
.el-icon-delete {
  width: 1em;
  height: 1em;
}
</style>
