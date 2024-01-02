<template>
  <el-table
    :data="slicedTableData"
    style="width: 100%"
    :row-key="(row) => row.date"
    @row-click="handleRowClick"
  >
    <el-table-column prop="date" label="员工号" width="180" />
    <el-table-column prop="name" label="员工名字" width="180" />
    <el-table-column prop="name" label="部门号" width="180" />
    <el-table-column prop="address" label="性别" />
    <el-table-column prop="address" label="年龄" />
    <el-table-column prop="address" label="职位" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    class="pagination"
    background
    layout="prev, pager, next"
    :total="1000"
  />

  <div class="changeBody flex" :class="{ none: isActive }">
    <el-form
      :label-position="labelPosition"
      label-width="60px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="员工名">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="部门号">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="page">确定</el-button>
        <el-button type="danger" @click="cancle">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, reactive } from "vue";
import API from "../axios/index";
import { useRouter } from "vue-router";
import type { FormProps } from "element-plus";

let isActive = ref(false);

const labelPosition = ref<FormProps["labelPosition"]>("right");

const cancle = () => {
  isActive.value = true;
};

const page = () => {
  API({
    url: "/department/page",
    method: "get",
    params: {
      page: 1,
      pageSize: 10,
    },
  });
};

const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
const router = useRouter();
const generateEmployeeData = () => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    data.push({
      date: `2022-01-${i < 10 ? "0" + i : i}`,
      name: `Employee${i}`,
      address: `Department${(i % 5) + 1}`,
      gender: i % 2 === 0 ? "Male" : "Female",
      age: 25 + (i % 10),
      position: `Position${(i % 3) + 1}`,
    });
  }
  return data;
};
const tableData = generateEmployeeData();
const currentPage = ref(1);
const pageSize = 10;

const slicedTableData = ref(tableData.slice(0, 10));

const handlePageChange = (page) => {
  currentPage.value = page;
  updateSlicedTableData();
};

const updateSlicedTableData = () => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  slicedTableData.value = tableData.slice(start, end);
};

const handleRowClick = (row) => {
  const name = row.name;
  console.log("Clicked Name:", name);
  router.push("/wage");
};
</script>

<style>
.pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0px;
  margin-bottom: 24px;
}
.changeBody {
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background: #ebe9e9;
  position: absolute;
  z-index: 222;
  left: 40%;
  top: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
}
.flex {
  display: flex;
}
.none {
  display: none;
}
</style>
