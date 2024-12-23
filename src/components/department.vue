<template>
  <!-- <el-input v-model="" placeholder="Please input" style="width: 200px" />
  <el-button type="primary" @click="">查询</el-button>

  <el-button type="primary" @click="">添加</el-button> -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="部门号" width="180" />
    <el-table-column prop="name" label="部门名" width="180" />
    <el-table-column prop="creatTime" label="创建时间" />
    <el-table-column prop="dname" label="主管" />
    <el-table-column prop="number" label="部门人数" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import API from "../axios/index";
import { onMounted } from "vue";
let tableData = ref([]);

const refresh = async () => {
  const res = await API({
    url: "/department/page",
    method: "get",
    params: {
      page: 1,
      pageSize: 10,
    },
  });

  tableData.value = res.data.data.data;
  // total.value = res.data.data.total;
  nextTick();
  // slicedTableData = ref(tableData.slice(0, 10));
};
onMounted(() => {
  refresh();
});
</script>
