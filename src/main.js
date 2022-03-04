import { createApp } from 'vue';
import App from './App.vue';
import router from '@/route/index';
import 'reset-css'; // 引入初始化样式的依赖
import store from './store'; // 引入公共数据仓库
import axios from '@/utils/request'; // 引入封装请求文件
import * as Incons from '@ant-design/icons-vue'; // 导入图标库
import * as echarts from 'echarts'; // 引入图表库
import i18n from '@/language';// 引入配置好的国际化语言插件

/**
 * 警告⚠：[Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive.
 * 原因：没有添加被动事件监听器来阻止'touchstart'事件，请考虑添加事件管理者'passive'，以使页面更加流畅。 Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners；
 */
import 'default-passive-events';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(i18n);

app.mount('#app');
// Vue3注册全局属性
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts;

// 开始使用全局图标【导入】
const icons = Incons;
for (const i in icons) {
  app.component(i, icons[i]);
}
