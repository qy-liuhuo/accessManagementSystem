<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
      data: {
        inNum: 0,
        outNum: 0,
        exceptionIntoApplication: 0,
        exceptionOutToApplication: 0,
      },
    };
  },
  created() {
    this.$store
      .dispatch("user/getPieData")
      .then((data) => {
        console.log(data);
        this.data = data;
        this.initChart();
      })
      .catch(() => {});
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["正常进入", "正常外出", "异常进入申请", "异常外出申请"],
        },
        series: [
          {
            name: "进出情况",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: [
              { value: this.data.inNum, name: "正常进入" },
              { value: this.data.outNum, name: "正常外出" },
              {
                value: this.data.exceptionIntoApplication,
                name: "异常进入申请",
              },
              {
                value: this.data.exceptionOutToApplication,
                name: "异常外出申请",
              },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>
