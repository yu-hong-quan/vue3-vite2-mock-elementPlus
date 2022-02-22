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
  function showMessageBox(
    title,
    type,
    message,
    isCancel,
    isConfirm,
    operationType,
    affairFnc
  ) {
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
          instance.confirmButtonText =
            operationType === 0 ? '正在删除中...' : '正在修改中...';
          setTimeout(() => {
            done();
            instance.confirmButtonLoading = false;
          }, 1000);
        } else {
          done();
        }
      },
    })
      .then((res) => {
        console.log(res);
        if (affairFnc() === true) {
          ElMessage({
            type: 'success',
            message: operationType === 0 ? '删除成功' : '修改成功',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        ElMessage({
          type: 'info',
          message: '已取消',
        });
      });
  }

  // 全屏/退出全屏
  function changeFullScreen(data) {
    let element = document.documentElement;
    if (data.fullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }
  function listenerEvent(fn, data) {
    document.onkeydown = (event) => {
      if (event.keyCode == 122) {
        event.preventDefault();
        changeFullScreen(data);
      }
    };
    document.addEventListener('fullscreenchange', fn);
    document.addEventListener('mozfullscreenchange', fn);
    document.addEventListener('webkitfullscreenchange', fn);
    document.addEventListener('msfullscreenchange', fn);
  }

  return {
    showGlobalLoading,
    hideGlobalLoading,
    showMessageBox,
    changeFullScreen,
    listenerEvent,
  };
};
