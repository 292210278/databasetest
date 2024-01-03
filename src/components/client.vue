<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-key="(row) => row.date"
    @row-click="handleRowClick"
  >
    <el-table-column prop="id" label="员工号" width="180"></el-table-column>
    <el-table-column prop="name" label="员工名字" width="180"></el-table-column>
    <el-table-column prop="did" label="部门号" width="180"> </el-table-column>
    <el-table-column prop="sex" label="性别"></el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
    <el-table-column prop="occupation" label="职位"></el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" @click.stop="changeClient(row)"
          >编辑</el-button
        >
        <el-button type="danger" @click.stop="delet(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    class="pagination"
    background
    layout="prev, pager, next"
    :total="total"
    @current-change="handlePageChange"
  />

  <div class="changeBody" :class="{ flex: close }">
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
        <el-input v-model="formLabelAlign.did" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="formLabelAlign.sex" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formLabelAlign.age" />
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="formLabelAlign.occupation" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button type="danger" @click="cancle">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="addBody" :class="{ flex: close }">
    <el-form
      :label-position="labelPosition"
      label-width="60px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="员工号">
        <el-input v-model="formLabelAlign.id" />
      </el-form-item>
      <el-form-item label="员工名">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="部门号">
        <el-input v-model="formLabelAlign.did" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="formLabelAlign.sex" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formLabelAlign.age" />
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="formLabelAlign.occupation" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCirfmon">确定</el-button>
        <el-button type="danger" @click="addClose">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-button type="primary" @click="addEmployee">添加新员工</el-button>
  <el-input v-model="input" placeholder="Please input" style="width: 200px" />
  <el-button type="primary" @click="searchEmployees">查询</el-button>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import API from "../axios/index";
import { useRouter } from "vue-router";
import { nextTick } from "vue";
import type { FormProps } from "element-plus";

let close = ref(false);
let globleID = ref("-1");
const formLabelAlign = reactive({
  id: "",
  name: "",
  did: "",
  sex: "",
  age: "",
  occupation: "",
});
const labelPosition = ref<FormProps["labelPosition"]>("right");

const refresh = () => {
  API({
    url: "/employee/page",
    method: "get",
    params: {
      page: 1,
      pageSize: 10,
    },
  }).then((res) => {
    tableData = res.data.data.data;
    total = res.data.data.total;
    console.log(tableData);

    // slicedTableData = ref(tableData.slice(0, 10));
  });
};

let renew = () => {
  formLabelAlign.id = "";
  formLabelAlign.name = "";
  formLabelAlign.age = "";
  formLabelAlign.occupation = "";
  formLabelAlign.did = "";
  formLabelAlign.sex = "";
};

const delet = (row) => {
  // const foundIndex = tableData.findIndex((data) => data.ID === row.id);
  API({
    url: "/employee/delete",
    method: "post",
    data: {
      ID: row.id,
    },
  });
  refresh();
  // if (foundIndex !== -1) {
  //   tableData.splice(foundIndex, 1);
  //   refresh();
  //   nextTick();
  // }
};

const addEmployee = () => {
  close.value = true;
};

const addCirfmon = () => {
  // const newEmployee = {
  //   ID: formLabelAlign.id,
  //   name: formLabelAlign.name,
  //   departmentID: formLabelAlign.did,
  //   sex: formLabelAlign.sex,
  //   age: parseInt(formLabelAlign.age, 10),
  //   occupation: formLabelAlign.occupation,
  // };
  API({
    url: "/employee/add",
    method: "post",
    data: formLabelAlign,
  });
  // tableData.push(newEmployee);
  renew();
  close.value = false;
  refresh();
  // updateSlicedTableData();
};

const addClose = () => {
  close.value = false;
};

const input = ref("");

const searchEmployees = () => {
  // 如果输入框内容为空，显示所有员工
  if (input.value === "") {
    refresh();
  } else {
    // 否则根据输入内容过滤员工
    const keyword = input.value.toLowerCase();
    // API({
    //   url:'',
    //   method: 'get',
    //   params: {
    //     keyword: keyword
    //   }
    // })
    // const filteredData = tableData.filter((employee) =>
    //   Object.values(employee).some(
    //     (value) => value && value.toString().toLowerCase().includes(keyword)
    //   )
    // );
    // slicedTableData.value = filteredData.slice(0, 10);
  }
};
const cancle = () => {
  close.value = false;
};

const confirm = () => {
  // const foundRow = tableData.find((data) => data.ID === globleID.value);
  // if (foundRow) {
  //   // 修改找到的数据的值
  //   foundRow.name = formLabelAlign.name;
  //   foundRow.did = formLabelAlign.did;
  //   foundRow.sex = formLabelAlign.sex;
  //   foundRow.age = parseInt(formLabelAlign.age, 10);
  //   foundRow.occupation = formLabelAlign.occupation;
  // }
  API({
    url: "/employee/update",
    method: "post",
    data: formLabelAlign,
  });
  renew();
  close.value = false;
};

const changeClient = (row) => {
  close.value = true;
  formLabelAlign.name = row.name;
  formLabelAlign.did = row.did;
  formLabelAlign.sex = row.sex;
  formLabelAlign.age = row.age;
  formLabelAlign.occupation = row.occupation;
  globleID.value = row.ID;
};

const router = useRouter();

let tableData = {};
// let pageInfo: {
//   page: 0;
//   pageSize: 10;
//   total: 0;
// };
const currentPage = ref(1);
const pageSize = 10;
let total = ref(0);

// let slicedTableData = ref(tableData.slice(0, 10));

const handlePageChange = (page) => {
  currentPage.value = page;
  updateSlicedTableData();
};

const changeSliced = () => {
  // slicedTableData = ref(tableData.slice(0, 10));
};

const updateSlicedTableData = () => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  let Data;
  // slicedTableData.value = tableData.slice(start, end);
  API({
    url: "/employee/page",
    method: "get",
    params: {
      page: currentPage.value,
      pageSize: pageSize,
    },
  }).then((res) => {
    Data = res.data.data.data;
  });
};

const handleRowClick = (row) => {
  const name = row.name;

  console.log("Clicked Name:", name);
  router.push("/wage");
};
onMounted(() => {
  refresh();
});
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
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background: #ebe9e9;
  position: absolute;

  left: 40%;
  top: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  opacity: 0;
  z-index: -1;
}
.addBody {
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background: #ebe9e9;
  position: absolute;

  left: 40%;
  top: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  opacity: 0;
  z-index: -2;
}
.flex {
  opacity: 1;
  z-index: 2;
}
.none {
  display: none;
}
</style>
