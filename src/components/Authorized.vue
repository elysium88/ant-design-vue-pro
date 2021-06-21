<script>
import { check } from "../utils/auth";

export default {
  name: "Authorized", //权限判断指令
  props: {
    authority: {
      type: Array,
      required: true,
    },
  },
  functional: true, //函数式组件，无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)
  render(createElement, context) {
    console.log(context);
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  },
};
</script>

<style scoped></style>
