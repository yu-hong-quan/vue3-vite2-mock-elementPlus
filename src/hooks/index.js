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

  // 消息弹出框
  function showMessageBox(title, type, message, isCancel, isConfirm) {
    ElMessageBox.confirm(message, title, {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      center: true,
      'round-button': false,
      'button-size': 'default',
      'close-on-click-modal': false,
      'show-cancel-button': isCancel,
      'show-confirm-button': isConfirm,
      type,
      beforeClose: (action, instance, done) => {
        //关闭之前
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = '正在删除中...';
          setTimeout(() => {
            done();
            instance.confirmButtonLoading = false;
          }, 3000);
        } else {
          done();
        }
      },
    })
      .then((res) => {
        console.log(res);
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        });
      });
  }

  return {
    showGlobalLoading,
    hideGlobalLoading,
    showMessageBox,
  };
};
