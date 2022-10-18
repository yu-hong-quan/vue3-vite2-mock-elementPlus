/*
 * @Descripttion: 
 * @Author: 小余
 * @Date: 2021-12-29 17:26:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-18 16:14:22
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// 引入mockjs插件
import { viteMockServe } from 'vite-plugin-mock';

// 引入插件即可直接在script标签上定义name
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

// 按需导入第三方UI库组件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import viteCompression from 'vite-plugin-compression';

// 资源预构建包插件，为了加快进入界面的速度
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

//引入 IE和旧版chrome兼容
import legacyPlugin from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/ 
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist', // 打包后文件包名称
    chunkSizeWarningLimit: 1500, //提高超大静态资源警告门槛
    minify: 'terser', //混淆器，terese构建后文件体积更小
    cssCodeSplit: false, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ['console.log'],
      },
      output: {
        comments: true, //去掉注释内容
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/static/js/[name]-[hash].js',
        entryFileNames: 'assets/static/js/[name]-[hash].js',
        assetFileNames: 'assets/static/[ext]/[name]-[hash].[ext]',
        // manualChunks: {
        //   // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
        //   vue: ['vue', 'vue-router', 'vuex'],
        //   echarts: ['echarts'],
        // },
        manualChunks (id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    brotliSize: false,
  },
  server: {
    open: true,
    host: 'localhost',
    hot: true,//开启热更新
    port: 3000,
    proxy: {
      //代理
      '/api': {
        target: 'http://192.168.0.124:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // 定义别名
  resolve: {
    alias: {
      // 如果报错提示 __dirname 找不到 则需要 yarn add @types/node --save-dev
      '@': path.resolve(__dirname, 'src'),
      'coms': path.resolve(__dirname, 'src/components'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  },
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 打包压缩，主要是本地gzip，如果服务器配置压缩也可以
    viteCompression({
      verbose: true,
      disable: false,//开启压缩(不禁用),默认即可
      threshold: 10240,
      algorithm: 'gzip',//压缩算法
      deleteOriginFile: false,//删除源文件
      ext: '.gz',//文件类型
    }),
    viteMockServe({
      supportTs: false, //如果使用 js开发，则需要配置 supportTs 为 false
    }),
    PkgConfig(),
    OptimizationPersist(),
    legacyPlugin({
      targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
    })
  ],
});
