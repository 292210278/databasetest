import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  dev: {
    proxyTable: {
      "/api": {
        // target: 'http://192.168.2.3:8888', //接口域名
        target: "http://121.40.249.137:8065", //接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "", //将 '/api' 替换为空
        },
      },
    },
  },
});
