<template>
  <div class="draw-content">
    <el-drawer v-model="isShow" :direction="direction" @close="hadeClose">
      <template #title>
        <span style="font-size: 17px">{{ $t('SystemSettings') }}</span>
      </template>
      <template #default>
        <el-divider> {{ $t('Theme') }} </el-divider>
        <div class="boxContaner day-mode">
          <el-switch
            v-model="data.nightMode"
            :active-text="$t('NightMode')"
            :inactive-text="$t('DaytimeMode')"
            @change="changeSetting('nightMode', data.nightMode)"
          >
          </el-switch>
        </div>
        <el-divider> {{ $t('SystemTheme') }} </el-divider>
        <div class="boxContaner">
          <div class="checkbox-row">
            <div
              class="checkbox-item"
              v-for="(item, index) in data.systemThemeList"
              :key="index"
              :class="{ active: item === data.systemThemeColor }"
              :style="{ backgroundColor: item }"
              @click="changeSetting('systemThemeColor', item)"
            ></div>
            <el-color-picker
              v-model="data.systemThemeColor"
              @active-change="changeSetting('systemThemeColor', $event)"
              style="height: auto"
            ></el-color-picker>
          </div>
        </div>
        <el-divider> {{ $t('TopBarTheme') }} </el-divider>
        <div class="boxContaner">
          <div class="checkbox-row">
            <div
              class="checkbox-item"
              v-for="(item, index) in data.navbarThemeList"
              :key="index"
              :class="{ active: item === data.navbarThemeColor }"
              :style="{ backgroundColor: item }"
              @click="changeSetting('navbarThemeColor', item)"
            ></div>
            <el-color-picker
              v-model="data.navbarThemeColor"
              @active-change="changeSetting('navbarThemeColor', $event)"
              style="height: auto"
            ></el-color-picker>
          </div>
        </div>
        <el-divider> {{ $t('MenuTheme') }} </el-divider>
        <div class="boxContaner">
          <div class="checkbox-row">
            <div
              class="checkbox-item"
              v-for="(item, index) in data.sidebarThemeList"
              :key="index"
              :class="{ active: item === data.sidebarThemeColor }"
              :style="{ backgroundColor: item }"
              @click="changeSetting('sidebarThemeColor', item)"
            ></div>
            <el-color-picker
              v-model="data.sidebarThemeColor"
              @active-change="changeSetting('sidebarThemeColor', $event)"
            ></el-color-picker>
          </div>
        </div>
        <el-divider> {{ $t('InterfaceDisplay') }} </el-divider>
        <!-- <div class="other-row">
          <span class="jiemian">面包屑</span>
          <el-switch
            v-model="data.showBreadcrumb"
            class="custom-switch"
            inline-prompt
            active-text="开"
            inactive-text="关"
            @change="changeSetting('showBreadcrumb', $event)"
          ></el-switch>
        </div> -->
        <div class="other-row">
          <span class="jiemian">{{ $t('NavigationPage') }}</span>
          <el-switch
            v-model="isTagsShow"
            :active-text="$t('Open')"
            :inactive-text="$t('Guan')"
            @change="changeTags($event)"
          ></el-switch>
        </div>
        <el-button class="draw-save" @click="isSetting = false">{{
          $t('Save')
        }}</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance, toRefs, reactive, ref, watch, defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { _data, _changeSetting, _getThemes } from '@/utils/setting.js'
// 获取当前组件的上下文
const { proxy } = getCurrentInstance(); // 此方法在开发环境以及生产环境下都能拿到组件上下文对象（推荐）
const $route = useRoute();
const $store = useStore();

// 获取父组件传来的值
const props = defineProps({
  isSetting: {
    type: Boolean,
    value: false
  }
})

// 自定义函数，父组件可以触发该函数用户子组件通信父组件
const em = defineEmits(['isParentDrawer'])
let isShow = ref(false)
isShow.value = props.isSetting

const direction = ref('rtl')
const switchBln = ref(false)
const data = reactive(_data)

const hadeClose = (e) => {
  isShow.value = false;
  em('isParentDrawer', isShow.value)
}

let isTagsShow = computed(() => $store.state.layout.isTagsShow);
watch(
  () => props.isSetting,
  (newValue, oldValue) => {
    isShow.value = newValue
  }
);

onMounted(() => {
  _getThemes({ data })
})

const changeSetting = (type, value) => {
  _changeSetting({ type, value, $store, data })
}

const changeTags = (value) => {
  $store.commit("layout/isTageBartShow", value);
}

</script>

<style lang="less" scoped>
@import '@/styles/themes.less';
@nav-bg-dark: #273352;
::v-deep(.el-drawer) {
  width: 21% !important;
}
::v-deep(.el-drawer__header) {
  padding-bottom: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  margin-bottom: 0px;
}
.boxContaner {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .checkbox-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    ::v-deep(.el-color-picker) {
      margin-right: 10px;
    }
    flex-wrap: wrap;
    .checkbox-item {
      width: 20px;
      height: 20px;
      border: 1px solid #ddd;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      flex-shrink: 0;
      margin-right: 10px;
      margin-bottom: 5px;

      &.active {
        border-color: @systemTheme;
        &::before {
          content: '\2713';
          font-size: 14px;
          color: #fff;
          position: absolute;
          top: 3px;
          left: 5px;
        }
      }
    }
  }
}

.other-row {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: #273352;
  margin-bottom: 15px;
  > span {
    display: flex;
    align-items: center;
  }
}
.draw-save {
  height: 32px;
  width: 50%;
  margin-left: 25%;
  margin-top: 100px !important;
  background-color: @systemTheme;
  color: #fff;
}

.el-overlay {
  z-index: 100;
}

::v-deep(.el-color-picker__trigger) {
  width: 30px !important;
  height: 30px !important;
  margin-bottom: 0 !important;
}

::v-deep(.el-color-picker__color) {
  border: none !important;
}
.other-row {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: #273352;
  margin-bottom: 15px;
}
.night-mode {
  .other-row {
    color: #c9d1d9;
  }
}
::v-deep(.el-drawer) {
  background: @contentBgColor;
}
::v-deep(.el-drawer__header) {
  border-bottom: 1px solid @contentBgColor;
}
</style>
