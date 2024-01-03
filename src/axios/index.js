import axios from "axios";

// 创建一个 axios 实例
const API = axios.create({
  baseURL: "http://121.40.249.137:8065/", // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    token: "your token",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default API;
