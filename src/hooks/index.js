/**
 * 自定义hooks：类似vue2.0的mixin
 */
import { ref, reactive } from 'vue';

export default () => {
  let loading = ref(true);

  // 显示全局loading加载
  function showGlobalLoading() {
    loading = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(255, 255, 255, 0.7)',
    });
  }

  // 隐藏全局loading加载
  function hideGlobalLoading() {
    setTimeout(() => {
      loading.close();
    }, 1000);
  }

  return {
    showGlobalLoading,
    hideGlobalLoading,
  };
};
