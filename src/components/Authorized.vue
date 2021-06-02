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
  functional: true,
  render(createElement, context) {
    console.log(context);
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  },
};
</script>

<style scoped></style>
