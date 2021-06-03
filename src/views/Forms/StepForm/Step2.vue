<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-Col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>

      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-Col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: step.password,
              rules: [{ required: true, message: '请输入付款密码' }],
            },
          ]"
          type="password"
          aria-placeholder="请输入付款密码"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 10px" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Step2",
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    },
  },
  methods: {
    handleSubmit() {
      const { form, $store, step } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.dispatch({
            type: "form/submitStepFORM",
            payload: { ...step, ...values },
          });
        }
      });
    },
    onPrev() {
      this.$router.push("/form/step-form/info");
    },
  },
};
</script>

<style scoped></style>
