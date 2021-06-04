function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = {
        code: "0000",
        data: [60, 70, 40, 10, 50, 60],
        desc: "成功",
      };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
