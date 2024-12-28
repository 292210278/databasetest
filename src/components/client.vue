<template>
  <el-input
    v-model="input"
    placeholder="请输入员工名或员工号"
    style="width: 200px"
    @input="searchEmployees"
  />
  <!-- <el-button type="primary" @click="searchEmployees">查询</el-button> -->
  <el-button
    type="primary"
    @click="addEmployee"
    style="margin: 20px; margin-left: 13px"
    >添加新员工</el-button
  >

  <el-table
    :data="tableData"
    style="width: 100%"
    :row-key="(row) => row.date"
    @row-click="handleRowClick"
  >
    <el-table-column prop="id" label="员工号" width="180"></el-table-column>
    <el-table-column prop="name" label="员工名字" width="180"></el-table-column>
    <el-table-column prop="dname" label="部门名称" width="180">
    </el-table-column>
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

  <div
    class="changeBody animate__animated"
    :class="{ flex: close, animate__fadeIn: close }"
  >
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
      <el-form-item label="部门名称">
        <el-input v-model="formLabelAlign.dname" />
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
  <div
    class="addBody animate__animated"
    :class="{
      flex: addActive,
      animate__fadeIn: addActive,
    }"
  >
    <el-form
      :label-position="labelPosition"
      label-width="60px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <!-- <el-form-item label="员工号">
        <el-input v-model="formLabelAlign.id" />
      </el-form-item> -->
      <el-form-item label="员工名">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="formLabelAlign.dname" />
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
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import API from "../axios/index";
import { useRouter } from "vue-router";
import { nextTick } from "vue";
import type { FormProps } from "element-plus";
import { ElMessage } from "element-plus";

let close = ref(false);
let addActive = ref(false);
let globleID = ref("-1");
const formLabelAlign = reactive({
  id: "",
  name: "",
  dname: "",
  sex: "",
  age: "",
  occupation: "",
});
const labelPosition = ref<FormProps["labelPosition"]>("right");

const refresh = async (page) => {
  const res = await API({
    url: "/employee/page",
    method: "get",
    params: {
      page: page || 1,
      pageSize: 10,
    },
  });

  tableData.value = res.data.data.data;
  total.value = res.data.data.total;
  console.log(total.value);

  nextTick();
};

let renew = () => {
  formLabelAlign.id = "";
  formLabelAlign.name = "";
  formLabelAlign.age = "";
  formLabelAlign.occupation = "";
  formLabelAlign.dname = "";
  formLabelAlign.sex = "";
};

const delet = (row) => {
  const currentPageValue = currentPage.value;
  API({
    url: "/employee/delete",
    method: "get",
    params: {
      id: row.id,
    },
  }).then(() => {
    refresh(currentPageValue);
  });
};

const addEmployee = () => {
  addActive.value = true;
};

const open1 = () => {
  ElMessage({
    showClose: true,
    message: "成功",
    type: "success",
  });
};

const addCirfmon = () => {
  let employee = formLabelAlign;
  const currentPageValue = currentPage.value;
  employee.did = 1;
  API({
    url: "/employee/add",
    method: "post",
    data: employee,
  })
    .then((res) => {
      open1();
    })
    .then(() => {
      refresh(currentPageValue);
    });
  // tableData.push(newEmployee);
  renew();
  addActive.value = false;

  // updateSlicedTableData();
};

const addClose = () => {
  console.log(789);

  addActive.value = false;
};

let input = ref("");

const searchEmployees = () => {
  const currentPageValue = currentPage.value;
  // 如果输入框内容为空，显示所有员工
  if (input.value === "") {
    refresh(currentPageValue);
  } else {
    // 否则根据输入内容过滤员工
    const msg = input.value.toLowerCase();
    API({
      url: "/employee/searcher",
      method: "get",
      params: {
        msg: msg,
        pageSize: 10,
        page: 1,
      },
    }).then((res) => {
      tableData.value = res.data.data.data;
    });
  }
};
const cancle = () => {
  close.value = false;
};

const confirm = () => {
  let employee = formLabelAlign;
  const currentPageValue = currentPage.value;

  API({
    url: "/employee/update",
    method: "post",
    data: employee,
  }).then(() => {
    refresh(currentPageValue);
  });
  // tableData.push(newEmployee);
  renew();
  close.value = false;
};

const changeClient = (row) => {
  close.value = true;
  formLabelAlign.id = row.id;
  formLabelAlign.name = row.name;
  formLabelAlign.dname = row.dname;
  formLabelAlign.sex = row.sex;
  formLabelAlign.age = row.age;
  formLabelAlign.occupation = row.occupation;
  globleID.value = row.ID;
};

const router = useRouter();

let tableData = ref([]);
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
  updateSlicedTableData(page);
};

const changeSliced = () => {
  // slicedTableData = ref(tableData.slice(0, 10));
};

const updateSlicedTableData = (page) => {
  // slicedTableData.value = tableData.slice(start, end);
  API({
    url: "/employee/page",
    method: "get",
    params: {
      page: currentPage.value,
      pageSize: pageSize,
    },
  }).then((res) => {
    tableData.value = res.data.data.data;
    currentPage.value = page;
    // $message.success(res.data.data.msg);
  });
};

const handleRowClick = (row) => {
  const id = row.id;
  router.push({ path: "/wage", query: { id: id } });
};
onMounted(() => {
  refresh(1);
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
