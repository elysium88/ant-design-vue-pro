<template>
  <div id="app">
    <a-config-provider :locale="local">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  watch: {
    "$route.query.locale": function (val) {
      this.local = val === "enUS" ? enUS : zhCN;
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    },
  },
  data() {
    return {
      local: zhCN,
    };
  },
};
</script>
<style lang="less"></style>
