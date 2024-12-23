<template>
  <div class="login-container">
    <span class="title">薪资管理系统</span>
    <div class="login-body">
      <div class="login">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 460px"
        >
          <el-form-item label="用户名">
            <el-input v-model="user.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user.password" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="x" />
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="success">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormProps } from "element-plus";
import { useRouter } from "vue-router";
import API from "../axios";

const router = useRouter();
const x = ref();
const labelPosition = ref<FormProps["labelPosition"]>("right");
let user = ref({
  username: "",
  password: "",
});
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
const toHome = () => {
  router.push("/home");
};
const login = () => {
  API({
    url: "/employee/login",
    method: "post",
    data: user.value,
  }).then((res) => {
    console.log(res);
    console.log(user);
    if (res.data.code === 1) {
      toHome();
    }
  });
};
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器占据整个视口的高度 */
  background: url("./bg.jpg") center center no-repeat;
  background-size: cover; /* Adjust the background size as needed */
}
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: rgba(218, 216, 216, 0.5); /* 使用 rgba 设置半透明背景颜色 */
  border-radius: 8px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px); /* 调整模糊程度 */
}
.login {
  position: absolute;
  top: 30%;
  left: 15%;
}
.title {
  position: absolute;
  left: 45%;
  top: 30%;
  font-size: 36px;
  z-index: 999;
}
.btn {
  position: absolute;
  top: 60%;
}
</style>
