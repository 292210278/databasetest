<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="员工号" width="180" />
    <el-table-column prop="name" label="员工名字" width="180" />
    <el-table-column label="基本工资">
      <template #default="{ row }">
        <span @click="changeWage(row)">{{ row.wage }}</span>
      </template>
    </el-table-column>
    <el-table-column label="奖金">
      <template #default="{ row }">
        <span @click="changeBonus(row)">{{ row.bonus }}</span>
      </template>
    </el-table-column>
    <el-table-column label="五险">
      <template #default="{ row }">
        <span @click="changeInsurance(row)">{{ row.insurance }}</span>
      </template>
    </el-table-column>
    <el-table-column label="实际薪资">
      <template #default="{ row }">
        <span>{{ row.actualSalary }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    wage: 5000,
    bonus: 1000,
    insurance: 800,
    actualSalary: 6800,
  },
  {
    date: "2016-05-02",
    name: "Jerry",
    wage: 6000,
    bonus: 1200,
    insurance: 900,
    actualSalary: 8100,
  },
  {
    date: "2016-05-04",
    name: "Alice",
    wage: 5500,
    bonus: 800,
    insurance: 700,
    actualSalary: 7000,
  },
  {
    date: "2016-05-01",
    name: "Bob",
    wage: 4800,
    bonus: 900,
    insurance: 750,
    actualSalary: 6450,
  },
];

const changeWage = (row) => {
  console.log(row.id);
  const user = prompt("更改金额");
  console.log(user);
};

const changeBonus = (row) => {
  console.log(row.id);
  const user = prompt("更改金额");
  console.log(user);
};

const changeInsurance = (row) => {
  console.log(row.id);
  const user = prompt("更改金额");
  console.log(user);
};
</script>
