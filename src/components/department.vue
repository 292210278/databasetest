<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="部门号" width="180" />
    <el-table-column prop="name" label="部门名" width="180" />
    <el-table-column prop="address" label="创建时间" />
    <el-table-column prop="address" label="主管" />
    <el-table-column prop="address" label="部门人数" />
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "sda",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
