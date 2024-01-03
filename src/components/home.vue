<template>
  <div class="charts">
    <v-chart class="chart1" :option="option" />
    <v-chart class="chart2" :option="option2" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const option = ref({
  backgroundColor: "#2c343c",
  title: {
    text: "月份支出表（单位/W）",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },

  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["春", "夏", "秋", "冬"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "经理室",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134],
    },
    {
      name: "财务室",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234],
    },
    {
      name: "技术科",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154],
    },
    {
      name: "售后人员",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334],
    },
    {
      name: "安保科",
      type: "line",
      stack: "Total",
      label: {
        show: true,
        position: "top",
      },
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [820, 932, 901, 934],
    },
  ],
});
const option2 = ref({
  backgroundColor: "#2c343c",
  title: {
    text: "年度支出表",
    left: "center",
  },
  legend: {
    top: "bottom",
  },
  series: [
    {
      type: "pie",
      radius: [50, 250],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 5,
      },
      data: [
        { value: 40000, name: "i经理室" },
        { value: 38000, name: "财务室" },
        { value: 52020, name: "技术科" },
        { value: 30000, name: "售后人员" },
        { value: 28000, name: "安保科" },
      ],
    },
  ],
});
</script>
<style scoped>
.charts {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background-color: #2c343c;
}
.chart1 {
  width: 700px;
  height: 700px;
}
.chart2 {
  width: 700px;
  height: 700px;
}
</style>
