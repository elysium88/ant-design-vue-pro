<template>
  <div>
    <chart :option="chartOption" style="height: 400px"></chart>
  </div>
</template>

<script>
import request from "../../utils/request";
//import random from "lodash/random";
import Chart from "../../components/Chart";
export default {
  name: "Analysis",

  components: { Chart },

  mounted() {
    this.getChartData();
    // this.interval = setInterval(() => {
    //   this.getChartData();
    // }, 1000);
  },
  beforeDestroy() {
    //clearInterval(this.interval);
  },
  data() {
    return {
      // 指定图表的配置项和数据
      chartOption: {},
    };
  },
  methods: {
    getChartData() {
      request({
        //url: "/api/dashboard/chart",
        url: "https://www.fastmock.site/mocka/7ae47df5ca44ce2596d4ed362376c969/test/dashboard/chart",
        method: "get",
        params: { ID: 12345 },
      }).then((response) => {
        console.log(response);
        this.chartOption = {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          legend: {
            data: ["销量"],
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data,
            },
          ],
        };
      });
    },
  },
};
</script>

<style scoped></style>
