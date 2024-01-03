<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
          :default-openeds="['1', '3']"
          background-color="rgba(70, 76, 91, 1)"
        >
          <el-sub-menu index="1" @click="toHome">
            <template #title>
              <span style="color: aliceblue">首页</span>
            </template>
          </el-sub-menu>
          <el-sub-menu index="2" @click="toClient">
            <template #title>
              <span style="color: aliceblue">员工</span>
            </template>
          </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment">
            <template #title
              ><span style="color: aliceblue">部门</span>
            </template>
          </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
          <el-sub-menu index="3" @click="toDepartment"> </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};

const toHome = () => {
  router.push("/home");
};

const toClient = () => {
  router.push("/client");
};
const toDepartment = () => {
  router.push("/department");
};
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
