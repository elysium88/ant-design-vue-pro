<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-Col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              rules: [{ required: true, message: '请输入付款账号' }],
            },
          ]"
          aria-placeholder="请输入付款账号"
        ></a-input>
      </a-form-item>

      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Step1",
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
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values,
          });
          $router.push("/form/step-form/confirm");
        }
      });
    },
  },
};
</script>

<style scoped></style>
