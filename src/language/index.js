import { createI18n } from 'vue-i18n';

import zh from './zh-CN';
import en from './en-US';

const i18n = createI18n({
  // legacy: false, // Composition API 模式
  globalInjection: true, // 全局注册 $t方法
  locale: localStorage.getItem('language') || 'zh',
  messages: {
    zh,
    en,
  },
});

export default i18n;
