<template>
  <div style="text-align: center">
    <!--    阿里icon-->
    <IconFont type="iconicon-404" style="font-size: 100px"></IconFont>
    <logo></logo>
  </div>
</template>

<script>
import logo from "@/assets/logo.svg";
export default {
  name: "404",
  components: { logo },
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped></style>
