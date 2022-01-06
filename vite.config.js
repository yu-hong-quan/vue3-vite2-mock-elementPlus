import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// 按需导入第三方UI库组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import viteCompression from 'vite-plugin-compression';

// vite引入模块
// const requireModules = import.meta.globEager("./modules/*.js")

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'buildProject', // 打包后文件包名称
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    cssCodeSplit: false, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true,  //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ['console.log'],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
          vue: ['vue', 'vue-router', 'vuex'],
          // echarts: ['echarts'],
        },
      },
    },
    brotliSize: false,
  },
  server: {
    open: true,
    host: 'localhost',
    port: 3000,
    proxy: {//代理
      '/api': {
        target: 'http://192.168.3.10:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  // 定义别名
  alias: {
    // 如果报错提示 __dirname 找不到 则需要 yarn add @types/node --save-dev
    "@": path.resolve(__dirname, "src"),
    "coms": path.resolve(__dirname, "src/components"),
    "utils": path.resolve(__dirname, "src/utils"),
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 打包压缩，主要是本地gzip，如果服务器配置压缩也可以
    viteCompression(),
  ]
})
