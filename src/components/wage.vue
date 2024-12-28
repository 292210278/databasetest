<template>
  <el-table :data="tableData" style="width: 100%" :row-key="(row) => row.id">
    <el-table-column prop="id" label="薪资号" width="180" />
    <el-table-column
      prop="ename"
      label="员工名字"
      width="180"
    /><el-table-column prop="month" label="月份"> </el-table-column>
    <el-table-column prop="baseSalary" label="基本工资"> </el-table-column>
    <el-table-column prop="bonusSalary" label="奖金"> </el-table-column>
    <el-table-column prop="deductSalary" label="扣除">
      <template #default="{ row }"
        ><el-button type="danger"> {{ row.deductSalary }}</el-button></template
      >
    </el-table-column>
    <el-table-column prop="fiveInsurances" label="五险"> </el-table-column>
    <el-table-column prop="totalSalary" label="实际薪资"> </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" @click.stop="changeWage(row)">编辑</el-button>
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
      <el-form-item label-width="80px">
        <span style="color: red">五险为基础工资的百分之二十!!</span>
      </el-form-item>
      <el-form-item label="员工名" label-width="80px">
        <el-input v-model="formLabelAlign.ename" />
      </el-form-item>
      <el-form-item label="基础工资" label-width="80px">
        <el-input v-model="formLabelAlign.baseSalary" />
      </el-form-item>
      <el-form-item label="奖金" label-width="80px">
        <el-input v-model="formLabelAlign.bonusSalary" />
      </el-form-item>
      <el-form-item label="实际工资" label-width="80px">
        <el-input v-model="formLabelAlign.totalSalary" />
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
let tableData = ref([]);
const currentPage = ref(1);
const formLabelAlign = reactive({
  id: "",
  ename: "",
  baseSalary: "",
  deductSalary: "",
  fiveInsurances: "",
  totalSalary: "",
  bonusSalary: "",
  mouth: "",
});
const refresh = async (id) => {
  const res = await API({
    url: "/salary/page",
    method: "get",
    params: {
      page: currentPage.value,
      pageSize: 10,
    },
  }).then((res) => {
    tableData.value = res.data.data.data;
    currentPage.value = page;
    // $message.success(res.data.data.msg);
  });

  tableData.value = res.data.data;
  console.log(tableData.value);

  nextTick();
};
const cancle = () => {
  close.value = false;
};

let renew = () => {
  formLabelAlign.id = "";
  formLabelAlign.ename = "";
  formLabelAlign.deductSalary = "";
  formLabelAlign.totalSalary = "";
  formLabelAlign.fiveInsurances = "";
  formLabelAlign.baseSalary = "";
  formLabelAlign.bonusSalary = "";
};

const changeWage = (row) => {
  close.value = true;
  formLabelAlign.id = row.id;
  formLabelAlign.ename = row.ename;
  formLabelAlign.baseSalary = row.baseSalary;
  formLabelAlign.totalSalary = row.totalSalary;
  formLabelAlign.fiveInsurances = row.fiveInsurances;
  formLabelAlign.deductSalary = row.deductSalary;
  formLabelAlign.bonusSalary = row.bonusSalary;
  formLabelAlign.mouth = row.mouth;
};

const confirm = () => {
  let salary = { ...formLabelAlign };
  API({
    url: "/salary/update",
    method: "post",
    data: salary,
  }).then(() => {
    refresh(router.currentRoute.value.query.id);
  });

  renew();

  close.value = false;
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
