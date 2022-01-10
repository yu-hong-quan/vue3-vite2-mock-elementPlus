import axios from 'axios';
import qs from 'qs';

const devBaseUrl = 'http://localhost:3000'; //测试
const proBaseUrl = 'http://192.168.3.10:5000'; //正式
let url;
import.meta.env.MODE === 'development'
  ? (url = devBaseUrl)
  : (url = proBaseUrl);

// 创建axios实例
const service = axios.create({
  // 在请求地址前面加上baseURL
  baseURL: url,
  // false 不跨域  true 跨域
  withCredentials: true,
  // 设置超时
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 指定请求令牌
    // if (store.getters.token) {
    // // 自定义令牌的字段名为X-Token，根据咱们后台再做修改
    // config.headers["X-Token"] = store.getters.token;
    // }
    config.headers['X-Token'] = 'my token';

    return config;
  },
  (error) => {
    // 请求错误的统一处理
    console.log(error);

    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 如果状态码不是200则认为有错误
    if (res.code !== 200) {
      ElMessage({
        message: error.message || 'Error',
        type: 'error',
        duration: 2 * 1000,
      });

      // 50008: 非法令牌; 50012: 其他客户端已登入; 50014: 令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        ElMessageBox.confirm('您已登出, 请重新登录', 'Warning', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        })
          .then(() => {
            // store.dispatch('user/resetToken').then(() => {
            //   location.reload()
            // })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      console.log('成功');
      return Promise.resolve(res);
    }
  },
  (error) => {
    console.log('err' + error); // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 2 * 1000,
    });
    return Promise.reject(error);
  }
);

export default {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   * @param {Object} headers  请求相关参数设置
   */
  get(url, params, headers) {
    headers = headers || {};
    return new Promise((resolve, reject) => {
      service
        .get(url, {
          params: params,
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   * @param {Object} headers  请求相关参数设置
   */
  post(url, params, headers) {
    headers = headers || {};
    return new Promise((resolve, reject) => {
      service
        .post(url, params, {
          headers: headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
};
