<template>
  <el-table :data="tableData" style="width: 100%" :row-key="(row) => row.date">
    <el-table-column prop="id" label="员工号" width="180" />
    <el-table-column prop="name" label="员工名字" width="180" />
    <el-table-column prop="wage" label="基本工资"> </el-table-column>
    <el-table-column prop="bonus" label="奖金"> </el-table-column>
    <el-table-column prop="insurance" label="五险"> </el-table-column>
    <el-table-column prop="actualSalary" label="实际薪资"> </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" @click.stop="changeWage(row)">编辑</el-button>
        <el-button type="danger" @click.stop="">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="changeBody" :class="{ flex: close }">
    <el-form
      :label-position="labelPosition"
      label-width="60px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="员工名" label-width="80px">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="基础工资" label-width="80px">
        <el-input v-model="formLabelAlign.wage" />
      </el-form-item>
      <el-form-item label="奖金" label-width="80px">
        <el-input v-model="formLabelAlign.bonus" />
      </el-form-item>
      <el-form-item label="实际工资" label-width="80px">
        <el-input v-model="formLabelAlign.actualSalary" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button type="danger" @click="cancle">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import API from "../axios/index";
import type { FormProps } from "element-plus";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const labelPosition = ref<FormProps["labelPosition"]>("right");
let close = ref(false);
// let tableData = ref([]);
let tableData = ref([
  {
    id: "2016-05-03",
    name: "Tom",
    wage: 5000,
    bonus: 1000,
    insurance: 800,
    actualSalary: 6800,
  },
]);
const formLabelAlign = reactive({
  id: "",
  name: "",
  wage: "",
  bonus: "",
  insurance: "",
  actualSalary: "",
});
const refresh = async (id) => {
  const res = await API({
    url: "/employee/getone",
    method: "get",
    params: {
      id: id,
    },
  });

  tableData.value = res.data.data.data;
  // total.value = res.data.data.total;
  nextTick();
  // slicedTableData = ref(tableData.slice(0, 10));
};
const cancle = () => {
  close.value = false;
};

let renew = () => {
  formLabelAlign.id = "";
  formLabelAlign.name = "";
  formLabelAlign.wage = "";
  formLabelAlign.actualSalary = "";
  formLabelAlign.insurance = "";
  formLabelAlign.bonus = "";
};

const changeWage = (row) => {
  close.value = true;
  formLabelAlign.id = row.id;
  formLabelAlign.name = row.name;
  formLabelAlign.wage = row.wage;
  formLabelAlign.actualSalary = row.actualSalary;
  formLabelAlign.insurance = row.insurance;
  formLabelAlign.bonus = row.bonus;
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
  const page = 1;
  let salary = formLabelAlign;
  API({
    url: "/salary/update",
    method: "post",
    data: salary,
  });
  renew();
  close.value = false;
  refresh(page);
};
onMounted(() => {
  refresh(router.currentRoute.value.query.id);
});
</script>

<style>
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
.flex {
  opacity: 1;
  z-index: 2;
}
.none {
  display: none;
}
</style>
