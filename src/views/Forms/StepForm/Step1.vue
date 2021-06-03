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
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-Col="formItemLayout.wrapperCol"
      >
        <!--        自定义表单组件-->
        <receiver-account
          v-decorator="[
            'receiveAccount',
            {
              initialValue: step.receiveAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: checkReceiveAccount,
                },
              ],
            },
          ]"
        ></receiver-account>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceiverAccount from "../../../components/ReceiverAccount";
export default {
  name: "Step1",
  components: { ReceiverAccount },
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
        console.log(err);
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values,
          });
          $router.push("/form/step-form/confirm");
        }
      });
    },

    checkReceiveAccount(rule, value, callback) {
      console.log(value);
      if (value && value.number) {
        callback();
        return;
      }
      callback(false);
    },
  },
};
</script>

<style scoped></style>
