import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 定义别名
  alias:{
    "@": path.resolve(__dirname,"src"),
    coms: path.resolve(__dirname,"src/components"),
  },
  plugins: [vue()]
})
