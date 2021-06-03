<template>
  <a-input-group compact>
    <a-select v-model="type" @change="handleTypeChange" style="width: 130px">
      <a-select-option value="alipay"> 支付宝 </a-select-option>
      <a-select-option value="bank"> 银行账户 </a-select-option>
    </a-select>
    <a-input
      style="width: calc(100% - 130px)"
      default-value="input content"
      v-model="number"
      @change="handleNumberChange"
    />
  </a-input-group>
</template>

<script>
export default {
  name: "ReceiverAccount",

  props: {
    value: {
      type: Object,
    },
  },
  watch: {
    value(val) {
      Object.assign(this, val);
    },
  },

  data() {
    const { type, number } = this.value || {};
    return {
      type: type || "",
      number: number || "",
    };
  },
  methods: {
    handleTypeChange(val) {
      console.log(val);
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChange(e) {
      console.log(e.target.value);
      this.$emit("change", { ...this.value, number: e.target.value });
    },
  },
};
</script>

<style scoped></style>
